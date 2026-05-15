import {Button, Link} from "@heroui/react";


export default function RegisterButton() {
    const clientId = 'nextjs';
    const issuer = process.env.AUTH_KEYCLOAK_ISSUER;
    const redirectUrl = process.env.AUTH_URL;
    
    const registerUrl = `${issuer}/protocol/openid-connect/registrations` +
    `?client_id=${clientId}&redirect_uri=` +
    `${encodeURIComponent(redirectUrl!)}&response_type=code&scope=openid`;
    
    return (
        <Button className='rounded-lg bg-purple-800 text-white'>
            <Link href={registerUrl} className='no-underline text-white hover:text-purple-400'>
                Register
            </Link>
        </Button>
    );
}