import QRCode from "qrcode";

export const dynamic = "force-dynamic";

async function makeDataUrl(text: string) {
  return await QRCode.toDataURL(text, { width: 250, margin: 1 });
}

export default async function DashboardQrPage() {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const checkInUrl = `${base}/check-in-form`;
  const checkOutUrl = `${base}/ask-check-in`;

  const [checkInDataUrl, checkOutDataUrl] = await Promise.all([
    makeDataUrl(checkInUrl),
    makeDataUrl(checkOutUrl),
  ]);

  return (
    <section className="space-y-8">
      <header>
        <a href="/dashboard" className="mb-2 inline-flex items-center gap-2 text-sm text-brand-700 hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M15 18l-6-6 6-6"/></svg>
          Back to Dashboard
        </a>
        <h1 className="text-2xl font-semibold">QR Codes</h1>
        <p className="text-gray-600">Share or print these to simplify entry/exit.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="card p-6 flex flex-col items-center gap-4">
          <h2 className="font-medium">Check-in QR</h2>
          <img src={checkInDataUrl} alt="Check-in QR" className="h-[250px] w-[250px]" />
          <a href={checkInUrl} className="text-sm text-brand-700 hover:underline" target="_blank">{checkInUrl}</a>
          <a
            href={checkInDataUrl}
            download={`check_in_qr_${new Date().toISOString().slice(0,10)}.png`}
            className="btn"
          >
            Download PNG
          </a>
        </div>
        <div className="card p-6 flex flex-col items-center gap-4">
          <h2 className="font-medium">Check-out QR</h2>
          <img src={checkOutDataUrl} alt="Check-out QR" className="h-[250px] w-[250px]" />
          <a href={checkOutUrl} className="text-sm text-brand-700 hover:underline" target="_blank">{checkOutUrl}</a>
          <a
            href={checkOutDataUrl}
            download={`check_out_qr_${new Date().toISOString().slice(0,10)}.png`}
            className="btn"
          >
            Download PNG
          </a>
        </div>
      </div>
    </section>
  );
}
