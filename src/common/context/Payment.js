import { createContext, useContext, useState } from "react";

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const paymentMethods = [
        {
            name: 'Boleto',
            interest: 1.0,
            id: 1
        },
        {
            name: 'Cartão de Crédito',
            interest: 1.3,
            id: 2
        },
        {
            name: 'PIX',
            interest: 1.0,
            id: 3
        },
        {
            name: 'Crediário',
            interest: 1.5,
            id: 4
        }
    ];

    const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);

    return (
        <PaymentContext.Provider value={{ paymentMethods, selectedPayment, setSelectedPayment }}>
            {children}
        </PaymentContext.Provider>
    )
}

export const usePaymentContext = () => {
    const { paymentMethods, selectedPayment, setSelectedPayment } = useContext(PaymentContext);

    const changePaymentMethod = (id) => {
        const newPaymentMethod = paymentMethods.find(payment => payment.id === id);
        setSelectedPayment(newPaymentMethod);
    }

    return {paymentMethods, selectedPayment, changePaymentMethod};
}