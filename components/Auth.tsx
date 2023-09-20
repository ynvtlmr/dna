import React, {useState} from "react";
import {supabase} from "../lib/supabase";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

// Atomic Components
const EmailInput: React.FC<{ value: string; onChange: (value: string) => void }> = ({value, onChange}) => (<TextField
        fullWidth
        label="Email"
        variant="outlined"
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
    />);

const PasswordInput: React.FC<{ value: string; onChange: (value: string) => void }> = ({value, onChange}) => (<TextField
        fullWidth
        label="Password"
        variant="outlined"
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
    />);

const AuthButton: React.FC<{ onClick: () => void; label: string; color: 'primary' | 'secondary' }> = ({onClick, label, color}) => (
    <Button variant="contained" color={color} onClick={onClick}>
        {label}
    </Button>);

// Main Component
const Auth: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleAuth = async (action: 'signUp' | 'signInWithPassword') => {
        const response = await supabase.auth[action]({email, password});
        const user = response.data?.user || null;

        if (response.error) {
            console.error(response.error);
        } else {
            console.log(`User ${action === 'signUp' ? 'registered' : 'logged in'}:`, user);
        }
    };

    return (<Container maxWidth="sm">
            <form noValidate autoComplete="off">
                <EmailInput value={email} onChange={setEmail}/>
                <PasswordInput value={password} onChange={setPassword}/>
                <AuthButton onClick={() => handleAuth('signUp')} label="Register" color="secondary"/>
                <AuthButton onClick={() => handleAuth('signInWithPassword')} label="Login" color="primary"/>
            </form>
        </Container>);
};

export default Auth;
