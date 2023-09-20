import React, {useState} from "react";
import {supabase} from "../lib/supabase";

// Atomic Components
const EmailInput: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => (
    <input type="email" placeholder="Email" value={value} onChange={(e) => onChange(e.target.value)} />
);

const PasswordInput: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => (
    <input type="password" placeholder="Password" value={value} onChange={(e) => onChange(e.target.value)} />
);

const AuthButton: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => (
    <button type="button" onClick={onClick}>
        {label}
    </button>
);

// Main Component
const Auth: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleAuth = async (action: 'signUp' | 'signInWithPassword') => {
        const response = await supabase.auth[action]({ email, password });
        const user = response.data?.user || null;

        if (response.error) {
            console.error(response.error);
        } else {
            console.log(`User ${action === 'signUp' ? 'registered' : 'logged in'}:`, user);
        }
    };

    return (
        <div className="container">
            <form>
                <EmailInput value={email} onChange={setEmail} />
                <PasswordInput value={password} onChange={setPassword} />
                <AuthButton onClick={() => handleAuth('signUp')} label="Register" />
                <AuthButton onClick={() => handleAuth('signInWithPassword')} label="Login" />
            </form>
        </div>
    );
};

export default Auth;
