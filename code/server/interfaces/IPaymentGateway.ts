interface IPaymentGateway {
    authorize: (cc: any, callback: (error: any, result: any) => void) => void;
    capture: (subscriptionID: string, callback: (error: any, result: any) => void) => void;
}

export = IPaymentGateway;