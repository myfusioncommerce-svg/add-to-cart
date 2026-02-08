import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Privacy() {
  return (
    <s-page heading="Privacy Policy" backAction={{ url: "/app" }}>
      <s-section>
        <s-box padding="loose" background="subdued" borderWidth="base" borderRadius="base">
          <s-stack direction="block" gap="loose">
            <div>
              <s-heading>Data Collection</s-heading>
              <s-paragraph>
                Fusion Add to Cart collects only the necessary information to provide our services. 
                This includes your shop name, email address, and configuration settings for the app blocks.
              </s-paragraph>
            </div>

            <div>
              <s-heading>Usage Tracking</s-heading>
              <s-paragraph>
                We may track interaction events (like ATC button clicks) to help you understand 
                the performance of our tools. This data is aggregated and does not identify individual customers.
              </s-paragraph>
            </div>

            <div>
              <s-heading>Data Security</s-heading>
              <s-paragraph>
                Your data is stored securely on our servers and is never shared with third parties 
                except as required to provide the app's functionality or as required by law.
              </s-paragraph>
            </div>

            <div>
              <s-heading>Your Rights</s-heading>
              <s-paragraph>
                You can request the deletion of your data at any time by uninstalling the app 
                or contacting our support team.
              </s-paragraph>
            </div>

            <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
              <s-paragraph>
                <em>Last updated: February 8, 2026</em>
              </s-paragraph>
            </div>
          </s-stack>
        </s-box>
      </s-section>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
