'use client'
import { Button, Card, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';

export function PWAInstall() {
    const [deferredPrompt, setDeferredPrompt] = useState<any | null>(null);
    const [installPromptVisible, setInstallPromptVisible] = useState(false);

    useEffect(() => {
        const beforeInstallPromptHandler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as any);
            setInstallPromptVisible(true);
        };

        window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

        return () => {
            window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
        };
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            setInstallPromptVisible(false);
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                setDeferredPrompt(null);
            });
        }
    };

    const listMenu = [
        {
            id: "1",
            title: "tools",
            link: "/tools"
        }
    ]
    return (
        <Stack flex={1} align='center' justify='center' h={"100vh"}>
            {installPromptVisible && (
                <Card withBorder>
                    <div id="installPromotion">
                        <Button id="installButton" onClick={handleInstallClick}>
                            Install App
                        </Button>
                    </div>
                </Card>
            )}
        </Stack>
    );
}