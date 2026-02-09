import { useLoaderData } from "react-router";
import { useState, useEffect } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  return { shop: session.shop };
};

export default function Index() {
  const { shop } = useLoaderData();
  const shopify = useAppBridge();
  const [showPopup, setShowPopup] = useState(false);

  const EXTENSION_ID = "c33408b829dd14271a746df36a7e2863";

  useEffect(() => {
    const hasShownPopup = localStorage.getItem("fusionSetupPopupShown");
    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem("fusionSetupPopupShown", "true");
  };

  const features = [
    {
      title: "Global ATC Icon",
      type: "App Embed",
      handle: "global_atc_icon",
      icon: "🌐",
      color: "#007ace",
      description: "Auto-inject icons onto every product card store-wide. Perfect for consistent conversion across collections.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      title: "Sticky ATC Bar",
      type: "App Block",
      handle: "sticky_atc_bar",
      icon: "📏",
      color: "#108043",
      description: "A conversion-focused bar with variants, quantity, and countdown timer that follows the user on scroll.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      title: "Floating ATC Overlay",
      type: "App Block",
      handle: "atc_icon_overlay",
      icon: "📍",
      color: "#5c6ac4",
      description: "A draggable, floating circular button that provides instant access to 'Add to Cart' from any screen position.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      title: "Grid ATC Injector",
      type: "App Block",
      handle: "grid_atc_injector",
      icon: "🔳",
      color: "#de3618",
      description: "Automatically detects and injects customizable ATC buttons into your theme's existing product grids.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      title: "Custom Button Styler",
      type: "App Block",
      handle: "custom_buttons",
      icon: "🎨",
      color: "#bf0711",
      description: "The ultimate styling tool. Replace default buttons with custom images, animations, and high-end typography.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
  ];

  const getDeepLink = (feature) => {
    const baseUrl = `https://${shop}/admin/themes/current/editor`;
    const templateParam = "template=product";
    
    if (feature.type === "App Embed") {
      return `${baseUrl}?${templateParam}&context=apps&activateAppEmbed=${EXTENSION_ID}/${feature.handle}`;
    }
    return `${baseUrl}?${templateParam}&context=apps&addAppBlockId=${EXTENSION_ID}/${feature.handle}&target=section`;
  };

  return (
    <s-page heading="Fusion Add to Cart Hub">
      <s-section>
        <s-paragraph>
          Boost your store's conversion rate by enabling these highly customizable Add to Cart tools.
        </s-paragraph>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '30px',
          marginTop: '30px' 
        }}>
          {features.map((feature, index) => (
            <s-box 
              key={index}
              padding="loose" 
              borderWidth="base" 
              borderRadius="base" 
              background="surface"
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%',
                borderTop: `6px solid ${feature.color}`,
                boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#ffffff'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.04)';
              }}
            >
              <s-stack direction="block" gap="loose">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ 
                    fontSize: '32px', 
                    background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}10 100%)`, 
                    width: '64px', 
                    height: '64px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    borderRadius: '20px',
                    color: feature.color,
                    boxShadow: `inset 0 0 0 1px ${feature.color}30`
                  }}>
                    {feature.icon}
                  </div>
                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: '900',
                    padding: '6px 14px', 
                    backgroundColor: feature.type === 'App Embed' ? '#f0f7ff' : '#f0fff4',
                    borderRadius: '30px',
                    color: feature.type === 'App Embed' ? '#007ace' : '#108043',
                    textTransform: 'uppercase',
                    letterSpacing: '1.2px',
                    border: `1px solid ${feature.type === 'App Embed' ? '#d0e7ff' : '#d0f5d4'}`
                  }}>
                    {feature.type}
                  </span>
                </div>

                <div style={{ padding: '4px 0' }}>
                  <s-heading variant="headingXl">{feature.title}</s-heading>
                  <div style={{ marginTop: '16px' }}>
                    <s-paragraph color="subdued" style={{ lineHeight: '1.7', fontSize: '15px' }}>{feature.description}</s-paragraph>
                  </div>
                </div>
                
                <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                  <s-stack direction="block" gap="base">
                    <s-button 
                      variant="primary" 
                      style={{ width: '100%', height: '48px', fontWeight: '700' }} 
                      onClick={() => { 
                        shopify.toast.show(`Opening ${feature.title} editor...`);
                        window.open(getDeepLink(feature), '_blank');
                      }}
                    >
                      Enable & Configure
                    </s-button>
                    {/* 
                    <s-button variant="plain" onClick={() => window.open(feature.videoUrl, '_blank')}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666' }}>
                        <span>📺</span> View Setup Guide
                      </div>
                    </s-button> 
                    */}
                  </s-stack>
                </div>
              </s-stack>
            </s-box>
          ))}
        </div>
      </s-section>

      <s-section slot="aside" heading="Pro Tips for Conversion">
        <s-stack direction="block" gap="loose">
          <s-paragraph>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span>🎨</span>
              <div>
                <strong>Brand Harmony:</strong> Match button colors to your primary action color. Consistent branding builds trust and increases clicks.
              </div>
            </div>
          </s-paragraph>
          
          <s-paragraph>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span>📱</span>
              <div>
                <strong>Mobile Optimization:</strong> 80% of users shop on mobile. Enable the <strong>Sticky ATC Bar</strong> to keep the buy button within thumb's reach at all times.
              </div>
            </div>
          </s-paragraph>

          <s-paragraph>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span>⚡</span>
              <div>
                <strong>Instant Gratification:</strong> Use the <strong>Global ATC Icon</strong> on collection pages so users can add items without extra clicks or page loads.
              </div>
            </div>
          </s-paragraph>

          <s-paragraph>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span>⏳</span>
              <div>
                <strong>Scarcity & Urgency:</strong> Add a countdown timer to your Sticky Bar. Limited-time offers can boost conversion by up to 30%.
              </div>
            </div>
          </s-paragraph>

          <s-paragraph>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span>💎</span>
              <div>
                <strong>Premium Feel:</strong> Use subtle hover animations like "Lift Up" or "Glow" to make your buttons feel interactive and high-end.
              </div>
            </div>
          </s-paragraph>

          <s-paragraph>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span>🔍</span>
              <div>
                <strong>Contrast is King:</strong> Ensure your button text is highly readable. Use white text on dark backgrounds or vice-versa for maximum impact.
              </div>
            </div>
          </s-paragraph>

          <s-paragraph>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span>🎁</span>
              <div>
                <strong>Upsell Strategy:</strong> Position your <strong>Floating ATC Overlay</strong> near popular product images to catch the user's eye during browsing.
              </div>
            </div>
          </s-paragraph>
        </s-stack>
      </s-section>

      {showPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000000,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '20px',
            maxWidth: '650px',
            width: '95%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            textAlign: 'center',
            position: 'relative',
            animation: 'fusionFadeIn 0.3s ease-out'
          }}>
            <button 
              onClick={closePopup}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#666'
              }}
            >✕</button>
            
            <div style={{ fontSize: '50px', marginBottom: '20px' }}>👋</div>
            <s-heading variant="headingLg">Welcome to Fusion ATC!</s-heading>
            <div style={{ marginTop: '15px', marginBottom: '30px' }}>
              <s-paragraph>
                Want to maximize your conversion rate from day one? 
                Let's get you set up perfectly! Would you like to align a setup call or live chat with us?
              </s-paragraph>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <s-button variant="primary" onClick={() => {
                window.open('https://calendly.com/fusion-apps/setup', '_blank');
                closePopup();
              }}>
                📅 Book a Setup Call
              </s-button>
              <s-button variant="secondary" onClick={() => {
                window.location.href = "/app/contact";
                closePopup();
              }}>
                💬 Start Live Chat
              </s-button>
              <s-button variant="plain" onClick={closePopup}>
                I'll do it myself
              </s-button>
            </div>
          </div>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes fusionFadeIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
          `}} />
        </div>
      )}
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
