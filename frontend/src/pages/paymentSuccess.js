import React from 'react'

function PaymentSuccess() {
  return (
    <div className='paysuccesspanel'>
      <div class="container">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <div class="success-container">
              <div class="success-icon">&#10004;</div>
              <h2>Order Placed Successfully</h2>
              <p>Your order has been placed successfully. Thank you for shopping with us!</p>
              <a href="/" class="btn btn-primary">Continue Shopping</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
