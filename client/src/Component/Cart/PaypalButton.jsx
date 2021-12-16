import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default class PaypalButton extends React.Component {
    render() {
        const onSuccess = (payment) => {

            console.log("The payment was succeeded!", payment);
            this.props.tranSuccess(payment)

        }

        const onCancel = (data) => {

            console.log('The payment was cancelled!', data);


        }

        const onError = (err) => {

            console.log("Error!", err);

        }

        let env = 'sandbox';
        let currency = 'USD';
        let total = this.props.total;


        const client = {
            sandbox: 'Abnxi1-ylObxO308or1FmzokrVQcp_8tn63aXJWelT-qXZR6lg-RDKHU-86ldQADoVrh7IW_t79VztyD',
            production: 'YOUR-PRODUCTION-APP-ID',
        }

        var style = {
            size: 'small',
            labe: 'checkout',
            color: 'blue',
            tagline: 'false'

        }
        return (
            <PaypalExpressBtn style={style} env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
        );
    }
}