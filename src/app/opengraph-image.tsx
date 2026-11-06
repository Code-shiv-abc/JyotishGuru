import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'JyotishGuru | Acharya Shri Pankaj Shukla — Vedic Astrologer in Ayodhya Dham';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0D0B1A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '20px solid #C9A84C',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed rgba(201, 168, 76, 0.3)',
            borderRadius: '24px',
            width: '100%',
            height: '100%',
            padding: '60px',
            background: 'radial-gradient(circle at center, rgba(201, 168, 76, 0.05) 0%, transparent 70%)',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              color: '#C9A84C',
              marginBottom: '20px',
              fontFamily: 'serif',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            JyotishGuru
          </div>

          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.2,
              marginBottom: '30px',
              fontFamily: 'serif',
            }}
          >
            Acharya Shri Pankaj Shukla
          </div>

          <div
            style={{
              fontSize: '32px',
              color: '#A09FB0',
              textAlign: 'center',
              maxWidth: '800px',
              fontFamily: 'sans-serif',
              marginBottom: '40px',
            }}
          >
            Expert Vedic Astrologer in Ayodhya Dham
          </div>

          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: 'auto',
            }}
          >
            {['Kundali', 'Horoscope', 'Matching'].map((service) => (
              <div
                key={service}
                style={{
                  padding: '10px 24px',
                  borderRadius: '100px',
                  background: 'rgba(201, 168, 76, 0.1)',
                  color: '#C9A84C',
                  fontSize: '24px',
                  border: '1px solid rgba(201, 168, 76, 0.2)',
                }}
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
