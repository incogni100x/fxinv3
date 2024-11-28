import { withdrawalSchema } from "@/app/(dashboard)/withdrawals/components/withdraw";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { z } from "zod";

// Infer the type of the schema to use as the prop type
type WithdrawalData = z.infer<typeof withdrawalSchema>;

interface BillingWithdrawalEmailProps extends WithdrawalData {
  first_name?: string;
}

export default function BillingWithdrawalNotification({
  first_name = "Customer",
  paymentMethod,
  amount,
  bankDetails,
  cryptoDetails,
}: BillingWithdrawalEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Withdrawal Request Details</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}></Section>
            <Section style={upperSection}>
              <Heading style={h1}>Withdrawal Request Submitted</Heading>
              <Text style={mainText}>
                {`Dear ${first_name}, a withdrawal request has been initiated.`}
              </Text>

              {/* Payment Method Section */}
              <Text style={mainText}>
                <strong>Payment Method:</strong>{" "}
                {paymentMethod === "bank" ? "Bank Transfer" : "Cryptocurrency"}
              </Text>

              {/* Bank Details Section */}
              {paymentMethod === "bank" && bankDetails && (
                <div>
                  <Text style={mainText}>
                    <strong>Bank Name:</strong> {bankDetails.bankName}
                  </Text>
                  <Text style={mainText}>
                    <strong>Account Name:</strong> {bankDetails.accountName}
                  </Text>
                  <Text style={mainText}>
                    <strong>Account Number:</strong> {bankDetails.accountNumber}
                  </Text>
                  <Text style={mainText}>
                    <strong>Routing Number:</strong> {bankDetails.routingNumber}
                  </Text>
                  <Text style={mainText}>
                    <strong>Account Type:</strong> {bankDetails.accountType}
                  </Text>
                </div>
              )}

              {/* Crypto Details Section */}
              {paymentMethod === "crypto" && cryptoDetails && (
                <div>
                  <Text style={mainText}>
                    <strong>Cryptocurrency:</strong> {cryptoDetails.currency}
                  </Text>
                  <Text style={mainText}>
                    <strong>Wallet Address:</strong> {cryptoDetails.address}
                  </Text>
                </div>
              )}

              {/* Amount Section */}
              <Text style={mainText}>
                <strong>Amount:</strong> {amount}
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const imageSection = {
  backgroundColor: "#252f3d",
  display: "flex",
  padding: "20px 0",
  alignItems: "center",
  justifyContent: "center",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const mainText = { ...text, marginBottom: "14px" };
