export interface LoginInputProps {
    placeholder: string;
    type: 'vertification' | 'password';
    base64?: string;
    setStateFunc: function;
    flushVertificationFunc?: function;
    className?: string;
    style?: object;
}
