import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  
  
  console.log("All env vars:", import.meta.env);
  console.log("PayPal Client ID:", clientId);
  console.log("Is undefined?", clientId === undefined);
  
 const amounts = parseFloat(amount);
  if (!clientId) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <p className="font-semibold">PayPal Configuration Error</p>
        <p>PayPal Client ID is not configured. Please check your environment variables.</p>
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id": clientId,
        currency: "USD",
        intent: "capture",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) =>
          actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amounts,
                  currency_code: "USD"
                },
              },
            ],
          })
        }
        onApprove={(data, actions) =>
          actions.order.capture().then((details) => {
            console.log("Payment successful:", details);
            onSuccess(details);
          })
        }
        onError={(err) => {
          console.error("PayPal Error:", err);
          onError(err);
        }}
        onCancel={(data) => {
          console.log("Payment cancelled:", data);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;