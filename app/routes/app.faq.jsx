import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function FAQ() {
  const faqs = [
    {
      category: "Getting Started",
      q: "How do I enable the Sticky ATC Bar?",
      a: "Go to your Online Store > Themes > Customize. Navigate to the Product page, and add the 'Sticky ATC Bar' block. It's designed to work instantly with your existing theme colors."
    },
    {
      category: "Customization",
      q: "Can I use my own custom images for buttons?",
      a: "Absolutely! Use the 'Custom Button Styler' block. You can upload any PNG, JPG, or SVG to replace standard buttons, giving your store a unique high-end feel."
    },
    {
      category: "Performance",
      q: "Does this app slow down my store?",
      a: "Speed is our priority. We use optimized Liquid delivery and lightweight Vanilla JS. Your Google Lighthouse and Core Web Vitals will remain excellent."
    },
    {
      category: "UX & Design",
      q: "How do I change the floating icon position?",
      a: "The floating icon is draggable by your customers on the live site for their convenience. You can set its default starting position in the theme editor settings."
    },
    {
      category: "Engagement",
      q: "Can I disable the success animation?",
      a: "The success checkmark and loading spinner are designed to keep users engaged on the product page. However, you can fully customize the colors and timing in the block settings."
    },
    {
      category: "Compatibility",
      q: "Is it compatible with my theme?",
      a: "We support all Shopify Online Store 2.0 themes. If you're using a highly customized or older theme and see issues, our support concierge is ready to help."
    }
  ];

  return (
    <s-page heading="Knowledge Base" backAction={{ url: "/app" }}>
      <div style={{ 
        background: '#f9fafb',
        minHeight: '100vh',
        padding: '60px 20px'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <s-heading variant="heading2xl">Everything you need to know</s-heading>
            <div style={{ marginTop: '16px' }}>
              <s-paragraph color="subdued" style={{ fontSize: '18px' }}>
                Find answers to common questions and learn how to maximize your store's conversion potential.
              </s-paragraph>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr', 
            gap: '24px' 
          }}>
            {faqs.map((faq, index) => (
              <details 
                key={index}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
              >
                <summary style={{
                  padding: '24px',
                  fontWeight: '700',
                  fontSize: '18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  listStyle: 'none',
                  color: '#111827'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ 
                      fontSize: '10px', 
                      backgroundColor: '#f3f4f6', 
                      padding: '4px 8px', 
                      borderRadius: '6px', 
                      color: '#6b7280',
                      textTransform: 'uppercase'
                    }}>{faq.category}</span>
                    {faq.q}
                  </div>
                  <span style={{ fontSize: '20px', color: '#9ca3af' }}>+</span>
                </summary>
                <div style={{
                  padding: '0 24px 24px 24px',
                  color: '#4b5563',
                  lineHeight: '1.6',
                  fontSize: '16px'
                }}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          <div style={{ 
            marginTop: '80px', 
            textAlign: 'center', 
            padding: '60px', 
            background: 'linear-gradient(135deg, #000 0%, #333 100%)', 
            borderRadius: '32px',
            color: 'white',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <s-heading variant="headingXl">Still have questions?</s-heading>
            <div style={{ marginTop: '16px', marginBottom: '32px', color: '#ccc' }}>
              <s-paragraph>
                Can't find what you're looking for? Our dedicated support team is here to help you 24/7.
              </s-paragraph>
            </div>
            <s-button variant="primary" onClick={() => window.location.href = "/app/contact"} style={{ backgroundColor: 'white', color: 'black' }}>
              Contact Support Concierge
            </s-button>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        details summary::-webkit-details-marker { display: none; }
        details[open] summary span:last-child { transform: rotate(45deg); }
        summary { outline: none; transition: background 0.2s; }
        summary:hover { background-color: #fbfbfb; }
      `}} />
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
