/**
 * Payment page logic
 * Handles: product display, payment method switching, QR generation,
 * clipboard copy, countdown timer, confirmation flow.
 */
(function () {
  'use strict';

  // --- DOM refs ---
  const productName = document.getElementById('product-name');
  const productPrice = document.getElementById('product-price');
  const productDesc = document.getElementById('product-desc');
  const qrCodeEl = document.getElementById('qr-code');
  const walletAddress = document.getElementById('wallet-address');
  const copyBtn = document.getElementById('copy-btn');
  const copyFeedback = document.getElementById('copy-feedback');
  const amountDisplay = document.getElementById('amount-display');
  const networkNote = document.getElementById('network-note');
  const countdownEl = document.getElementById('countdown');
  const timerFill = document.getElementById('timer-fill');
  const btnConfirm = document.getElementById('btn-confirm');
  const verificationStatus = document.getElementById('verification-status');
  const contactEmail = document.getElementById('contact-email');
  const contactTg = document.getElementById('contact-tg');
  const methodTabs = document.querySelectorAll('.method-tab');

  // --- State ---
  let selectedProduct = null;
  let selectedMethod = 'binance';
  let timerInterval = null;
  let remainingSeconds = PAYMENT_CONFIG.paymentWindowSeconds;
  const orderId = generateOrderId();

  // --- Init ---
  function init() {
    loadProduct();
    setupMethodTabs();
    setupCopyButton();
    setupConfirmButton();
    updatePaymentDisplay();
    startTimer();
    updateContactLinks();
  }

  // --- Product loading ---
  function loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const productKey = params.get('product') || 'single';
    selectedProduct = PAYMENT_CONFIG.products[productKey] || PAYMENT_CONFIG.products.single;

    productName.textContent = selectedProduct.name;
    productPrice.textContent = '$' + selectedProduct.price.toFixed(2) + ' USDT';
    productDesc.textContent = selectedProduct.desc;
  }

  // --- Payment method tabs ---
  function setupMethodTabs() {
    methodTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        methodTabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        selectedMethod = tab.getAttribute('data-method');
        updatePaymentDisplay();
      });
    });
  }

  // --- Update payment details for selected method ---
  function updatePaymentDisplay() {
    var wallet = PAYMENT_CONFIG.wallets[selectedMethod];
    if (!wallet) return;

    walletAddress.textContent = wallet.address;
    networkNote.textContent = wallet.note;

    if (wallet.currency === 'USDT') {
      amountDisplay.textContent = selectedProduct.price.toFixed(2) + ' USDT';
    } else {
      amountDisplay.textContent = selectedProduct.price.toFixed(2) + ' USDT equivalent in ' + wallet.currency;
    }

    generateQR(wallet.address);
  }

  // --- QR Code generation ---
  function generateQR(text) {
    qrCodeEl.innerHTML = '';
    if (typeof QRCode === 'undefined') {
      qrCodeEl.textContent = 'QR library not loaded';
      return;
    }
    var canvas = document.createElement('canvas');
    QRCode.toCanvas(canvas, text, {
      width: 200,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' },
    }, function (err) {
      if (err) {
        qrCodeEl.textContent = 'QR generation failed';
        return;
      }
      qrCodeEl.appendChild(canvas);
    });
  }

  // --- Copy to clipboard ---
  function setupCopyButton() {
    copyBtn.addEventListener('click', function () {
      var addr = walletAddress.textContent;
      if (!addr || addr === '--') return;

      navigator.clipboard.writeText(addr).then(function () {
        copyFeedback.classList.add('show');
        setTimeout(function () {
          copyFeedback.classList.remove('show');
        }, 2000);
      }).catch(function () {
        // Fallback for older browsers
        var ta = document.createElement('textarea');
        ta.value = addr;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        copyFeedback.classList.add('show');
        setTimeout(function () {
          copyFeedback.classList.remove('show');
        }, 2000);
      });
    });
  }

  // --- Countdown timer ---
  function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(function () {
      remainingSeconds--;
      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        remainingSeconds = 0;
        countdownEl.textContent = 'Expired / 已过期';
        timerFill.style.width = '0%';
        return;
      }
      updateTimerDisplay();
    }, 1000);
  }

  function updateTimerDisplay() {
    var mins = Math.floor(remainingSeconds / 60);
    var secs = remainingSeconds % 60;
    countdownEl.textContent = pad(mins) + ':' + pad(secs);
    var pct = (remainingSeconds / PAYMENT_CONFIG.paymentWindowSeconds) * 100;
    timerFill.style.width = pct + '%';
  }

  function pad(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  // --- Confirm button ---
  function setupConfirmButton() {
    btnConfirm.addEventListener('click', function () {
      verificationStatus.classList.remove('hidden');
      verificationStatus.scrollIntoView({ behavior: 'smooth' });

      // Activate first step
      var steps = verificationStatus.querySelectorAll('.status-step');
      steps[0].classList.add('active');
      steps[1].classList.add('active');
    });
  }

  // --- Contact links ---
  function updateContactLinks() {
    var cfg = PAYMENT_CONFIG.contact;
    var subject = encodeURIComponent('Payment Verification - Order ' + orderId);
    var body = encodeURIComponent(
      'Order ID: ' + orderId + '\n' +
      'Product: ' + (selectedProduct ? selectedProduct.name : '') + '\n' +
      'Amount: $' + (selectedProduct ? selectedProduct.price.toFixed(2) : '') + ' USDT\n' +
      'Transaction Hash (TXID): \n' +
      'Payment Method: ' + selectedMethod + '\n'
    );

    contactEmail.href = 'mailto:' + cfg.email + '?subject=' + subject + '&body=' + body;
    contactEmail.textContent = 'Email: ' + cfg.email;
    contactTg.href = 'https://t.me/' + cfg.telegram;
    contactTg.textContent = 'Telegram: @' + cfg.telegram;
  }

  // --- Order ID ---
  function generateOrderId() {
    var ts = Date.now().toString(36).toUpperCase();
    var rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return 'ORD-' + ts + '-' + rand;
  }

  // --- Start ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
