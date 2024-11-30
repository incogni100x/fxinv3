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

interface SupportEmailProps {
  name: string;
  email: string;

  message: string;
}

export default function SupportEmail({
  name,
  email,

  message,
}: SupportEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Support Request from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={upperSection}>
              <Heading style={h1}>Support Request</Heading>
              <Text style={mainText}>
                We have received a support request from one of our users. Here
                are the details:
              </Text>
              <Section style={detailsSection}>
                <Text style={detailText}>
                  <strong>Name:</strong> {name}
                </Text>
                <Text style={detailText}>
                  <strong>Email:</strong> {email}
                </Text>

                <Text style={detailText}>
                  <strong>Message:</strong>
                </Text>
                <Text style={messageText}>{message}</Text>
              </Section>
              <Text style={mainText}>
                A support team member will reach out to resolve the issue
                shortly.
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

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const detailsSection = {
  margin: "20px 0",
  padding: "15px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const detailText = {
  ...text,
  marginBottom: "8px",
};

const messageText = {
  ...text,
  marginTop: "10px",
  fontStyle: "italic",
};

const mainText = { ...text, marginBottom: "14px" };
