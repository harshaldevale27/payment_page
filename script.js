function showPaymentDetails(paymentType) {
    const paymentMethods = ['credit-card', 'paypal', 'upi', 'net-banking'];
    paymentMethods.forEach(type => {
        document.getElementById(`${type}-details`).style.display = type === paymentType ? 'block' : 'none';
    });
}
function redirectToPayPal(amount) {
    const paypalUrl = `https://www.paypal.com/donate?business=YOUR_PAYPAL_ID&currency_code=INR&amount=${amount}`;
    window.location.href = paypalUrl;
}
function displayNetBankingSteps() {
    const bank = document.getElementById('bank').value;
    const netBankingSteps = document.getElementById('net-banking-steps');
    if (bank) {
        netBankingSteps.style.display = 'block';
    } else {
        netBankingSteps.style.display = 'none';
    }
}

// Process net banking payment with additional verification
function processNetBanking() {
    const accountNumber = document.getElementById('account-number').value;
    const otp = document.getElementById('otp').value;

    if (!accountNumber) {
        alert("Please enter your account number.");
        return;
    }

    if (!otp) {
        alert("Please enter the OTP sent to your phone.");
        return;
    }

    alert("Net banking payment confirmed. Thank you for your donation!");
}

// Event listener for the form submission
document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked');

    if (!amount || parseFloat(amount) <= 0) {
        alert("Please enter a valid donation amount.");
        return;
    }

    if (!paymentMethod) {
        alert("Please select a payment method.");
        return;
    }

    const selectedPaymentMethod = paymentMethod.value;

    switch (selectedPaymentMethod) {
        case 'net-banking':
            const bank = document.getElementById('bank').value;
            if (!bank) {
                alert("Please select a bank.");
                return;
            }

            displayNetBankingSteps();
            break;

        // Other payment methods...
    }
});

document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked');

    if (!amount || parseFloat(amount) <= 0) {
        alert("Please enter a valid donation amount.");
        return;
    }
    
    if (!paymentMethod) {
        alert("Please select a payment method.");
        return;
    }

    const selectedPaymentMethod = paymentMethod.value;

    switch (selectedPaymentMethod) {
        case 'credit-card':
            const cardName = document.getElementById('cc-name').value;
            const cardNumber = document.getElementById('cc-number').value;
            const cardExp = document.getElementById('cc-exp').value;
            const cardCvv = document.getElementById('cc-cvv').value;
            if (cardName && cardNumber && cardExp && cardCvv) {
                alert("Credit card payment processed. Thank you for your donation!");
            } else {
                alert("Please fill out all credit card details.");
            }
            break;

        case 'paypal':
            if (amount) {
                alert("Redirecting to PayPal...");
                redirectToPayPal(amount);
            } else {
                alert("Invalid amount. Please enter a valid donation amount.");
            }
            break;

        case 'upi':
            const upiMethod = document.getElementById('upi-method').value;
            const upiId = document.getElementById('upi-id').value;
            if (upiMethod && upiId) {
                alert(`Payment request sent via ${upiMethod} with UPI ID: ${upiId}. Please confirm in your app.`);
            } else {
                alert("Please select a UPI method and enter a valid UPI ID.");
            }
            break;

        case 'net-banking':
            const bank = document.getElementById('bank').value;
            if (bank) {
                alert(`Redirecting to ${bank} for payment completion.`);
            } else {
                alert("Please select a bank.");
            }
            break;

        default:
            alert("Please select a valid payment method.");
    }
});
