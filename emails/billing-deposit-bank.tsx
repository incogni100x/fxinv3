import { Transaction } from "@prisma/client";
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

interface BillingDepositEmailProp {
  email?: string;
  method: Transaction["method"];
}

export default function BillingDepositEmail({
  email = "Customer",
  method,
}: BillingDepositEmailProp) {
  return (
    <Html>
      <Head />
      <Preview>
        {method === "crypto"
          ? "Crypto Deposit Requested"
          : "Bank Deposit Requested"}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}></Section>
            <Section style={upperSection}>
              <Heading style={h1}>
                {method === "crypto"
                  ? "Crypto Transaction Initiated"
                  : "Bank Deposit Initiated"}
              </Heading>
              <Text style={mainText}>
                {`Dear ${email}, a ${
                  method === "crypto" ? "crypto deposit" : "bank deposit"
                } transaction has been initiated.`}
              </Text>

              {/* Display details for crypto transaction */}
              {method === "bank" && (
                <Text style={mainText}>
                  {
                    "Our customer support will contact you shortly with the bank details."
                  }
                </Text>
              )}
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
