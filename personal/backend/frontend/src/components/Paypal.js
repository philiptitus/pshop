import React, { useEffect, useRef } from 'react';

const PayPalButton = ({ amount, successPaymentHandler }) => {
  const paypalRef = useRef();

  useEffect(() => {
    const addPaypalScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src =
        'https://www.paypal.com/sdk/js?client-id=AdAAfQXmnLSjjAx7l3wQJMslCUTyAlGfoGIGFOOHjCBF6yv0bWAmXOKtZUljfSla4NA70lROazvDV31P';
      script.async = true;
      script.onload = () => {
        renderPayPalButtons();
      };
      document.body.appendChild(script);
    };

    const renderPayPalButtons = () => {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const details = await actions.order.capture();
          successPaymentHandler(details);
        },
      }).render(paypalRef.current);
    };

    if (!window.paypal) {
      addPaypalScript();
    } else {
      renderPayPalButtons();
    }
  }, [amount, successPaymentHandler]);

  return (
    <div>
      <p>Select a payment option:</p>
      <div ref={paypalRef}></div>
    </div>
  );
};

export default PayPalButton;
