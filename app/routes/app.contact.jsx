import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Contact() {
  const shopify = useAppBridge();

  const handleSubmit = (e) => {
    e.preventDefault();
    shopify.toast.show("Message received! Our conversion experts will reach out shortly.");
  };

  return (
    <s-page heading="Support Concierge" backAction={{ url: "/app" }}>
      <div style={{ 
        background: 'linear-gradient(to bottom, #f9fafb, #ffffff)',
        minHeight: '100vh',
        padding: '40px 20px'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ 
              display: 'inline-block', 
              padding: '8px 16px', 
              backgroundColor: '#EEF2FF', 
              color: '#4F46E5', 
              borderRadius: '20px', 
              fontSize: '12px', 
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '16px'
            }}>
              Direct Support
            </div>
            <s-heading variant="heading2xl">We're here to help you grow</s-heading>
            <div style={{ marginTop: '16px' }}>
              <s-paragraph color="subdued" style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
                Whether you need technical assistance or strategic advice on boosting conversions, 
                our team of experts is just a message away.
              </s-paragraph>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {/* Left Side: Info Cards */}
            <s-stack direction="block" gap="loose">
              <s-box padding="loose" background="surface" borderRadius="base" style={{ 
                boxShadow: '0 10px 25px rgba(0,0,0,0.03)', 
                border: '1px solid #f0f0f0',
                transition: 'transform 0.3s ease'
              }}>
                <s-stack direction="block" gap="base">
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>✉️</div>
                  <s-heading variant="headingMd">Email Support</s-heading>
                  <s-paragraph color="subdued">support@fusionapps.io</s-paragraph>
                  <div style={{ fontSize: '12px', color: '#108043', fontWeight: '600' }}>● Online Now</div>
                </s-stack>
              </s-box>

              <s-box padding="loose" background="surface" borderRadius="base" style={{ 
                boxShadow: '0 10px 25px rgba(0,0,0,0.03)', 
                border: '1px solid #f0f0f0'
              }}>
                <s-stack direction="block" gap="base">
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>⚡</div>
                  <s-heading variant="headingMd">Response Time</s-heading>
                  <s-paragraph color="subdued">We typically respond in under 12 hours.</s-paragraph>
                </s-stack>
              </s-box>

              <s-box padding="loose" background="surface" borderRadius="base" style={{ 
                boxShadow: '0 10px 25px rgba(0,0,0,0.03)', 
                border: '1px solid #f0f0f0'
              }}>
                <s-stack direction="block" gap="base">
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>📅</div>
                  <s-heading variant="headingMd">Business Hours</s-heading>
                  <s-paragraph color="subdued">Mon - Fri, 9am - 6pm EST</s-paragraph>
                </s-stack>
              </s-box>
            </s-stack>

            {/* Right Side: Contact Form */}
            <s-box padding="loose" background="surface" borderRadius="base" style={{ 
              boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
              border: '1px solid #f0f0f0',
              padding: '40px'
            }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Your name" 
                    style={{ 
                      padding: '14px 16px', 
                      borderRadius: '10px', 
                      border: '1px solid #e5e7eb',
                      fontSize: '15px',
                      outline: 'none',
                      backgroundColor: '#f9fafb'
                    }} 
                    required 
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Subject</label>
                  <input 
                    type="text" 
                    placeholder="What can we help you with?" 
                    style={{ 
                      padding: '14px 16px', 
                      borderRadius: '10px', 
                      border: '1px solid #e5e7eb',
                      fontSize: '15px',
                      outline: 'none',
                      backgroundColor: '#f9fafb'
                    }} 
                    required 
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Detailed Message</label>
                  <textarea 
                    rows="5" 
                    placeholder="Tell us more about your request..." 
                    style={{ 
                      padding: '14px 16px', 
                      borderRadius: '10px', 
                      border: '1px solid #e5e7eb',
                      fontSize: '15px',
                      resize: 'none',
                      outline: 'none',
                      backgroundColor: '#f9fafb'
                    }} 
                    required 
                  ></textarea>
                </div>

                <s-button variant="primary" type="submit" style={{ height: '52px', fontSize: '16px', fontWeight: '700', marginTop: '10px' }}>
                  Send Message
                </s-button>
              </form>
            </s-box>
          </div>
        </div>
      </div>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
