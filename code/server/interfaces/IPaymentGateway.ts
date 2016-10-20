interface IPaymentGateway {
    authorize: (cc: any, callback: (error: any, result: any) => void) => void;
    capture: (subscription: any, callback: (error: any, result: any) => void) => void;
}

export = IPaymentGateway;