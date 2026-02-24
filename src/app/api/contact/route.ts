export async function POST(req: Request) {
    const formData = await req.formData();

    const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzSs_2AbxgpjhaZB90utLCojURO1SabKmEFg3aTxchoUHvOaz3kN4O0reOUtQY2oON9KQ/exec",
        {
            method: "POST",
            body: formData,
        }
    );

    const text = await response.text();

    return new Response(text, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}