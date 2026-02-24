export async function POST(req: Request) {
    const formData = await req.formData();

    const response = await fetch(
        "https://script.google.com/macros/s/AKfycbydldLhXHN_QZCmnQQkYiLXnp9RnkDRaXzCMHCThVBKbZitQkIzN3TYrg_2mIUyIb_t5w/exec",
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