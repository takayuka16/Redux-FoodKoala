import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
} from "@stripe/react-stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useEffect } from "react";
// import styles from "../../styles/Stripe.module.css";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("お支払いが完了しました");
          break;
        case "processing":
          setMessage("お支払い内容を確認しています");
          break;
        case "requires_payment_method":
          setMessage(
            "エラーが発生しました。もう一度お支払いを実行してください"
          );
          break;
        default:
          setMessage("Something went wrong");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost3000/order_completed",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured. ");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button id="submit" disabled={isLoading || !elements || !stripe}>
        <span id="button-text">
          {isLoading ? (
            <div className={"spinner"} id="spinner"></div>
          ) : (
            "支払いを完了する"
          )}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
