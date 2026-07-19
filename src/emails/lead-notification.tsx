/* eslint-disable @next/next/no-head-element */
import * as React from "react";

export type LeadLocale = "en" | "pt";

export type LeadNotificationData = {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget?: string;
  message: string;
  locale: LeadLocale;
};

type LeadNotificationEmailProps = {
  lead: LeadNotificationData;
};

const styles = {
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: "#f3f0e8",
    color: "#171713",
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  shell: {
    width: "100%",
    padding: "36px 16px",
  },
  card: {
    width: "100%",
    maxWidth: "620px",
    margin: "0 auto",
    border: "1px solid #d7d1c3",
    backgroundColor: "#fffef9",
  },
  header: {
    padding: "28px 30px 22px",
    borderBottom: "4px solid #d94a2d",
  },
  eyebrow: {
    margin: "0 0 10px",
    color: "#5b584f",
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
  },
  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 600,
    lineHeight: 1.05,
  },
  content: {
    padding: "24px 30px 32px",
  },
  row: {
    padding: "10px 0",
    borderBottom: "1px solid #e5e0d5",
    verticalAlign: "top" as const,
  },
  label: {
    width: "34%",
    paddingRight: "16px",
    color: "#6b675e",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
  },
  value: {
    color: "#171713",
    fontSize: "15px",
    lineHeight: 1.5,
    overflowWrap: "anywhere" as const,
  },
  messageLabel: {
    margin: "26px 0 8px",
    color: "#6b675e",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
  },
  message: {
    margin: 0,
    padding: "18px",
    borderLeft: "4px solid #2f6b45",
    backgroundColor: "#f3f0e8",
    fontSize: "15px",
    lineHeight: 1.65,
    whiteSpace: "pre-wrap" as const,
    overflowWrap: "anywhere" as const,
  },
};

function getCopy(locale: LeadLocale) {
  return locale === "pt"
    ? {
        preview: "Novo contato pelo case Studio Flamboyant",
        eyebrow: "Studio Flamboyant · case conceitual",
        title: "Novo projeto digital",
        name: "Nome",
        email: "E-mail",
        company: "Empresa",
        projectType: "Tipo de projeto",
        budget: "Faixa de investimento",
        message: "Mensagem",
      }
    : {
        preview: "New inquiry from the Studio Flamboyant case",
        eyebrow: "Studio Flamboyant · conceptual case",
        title: "New digital project",
        name: "Name",
        email: "Email",
        company: "Company",
        projectType: "Project type",
        budget: "Budget range",
        message: "Message",
      };
}

export function LeadNotificationEmail({ lead }: LeadNotificationEmailProps) {
  const copy = getCopy(lead.locale);
  const rows = [
    [copy.name, lead.name],
    [copy.email, lead.email],
    [copy.company, lead.company],
    [copy.projectType, lead.projectType],
    [copy.budget, lead.budget],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <html lang={lead.locale === "pt" ? "pt-BR" : "en"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{copy.preview}</title>
      </head>
      <body style={styles.body}>
        <div style={{ display: "none", maxHeight: 0, overflow: "hidden" }}>
          {copy.preview}
        </div>
        <div style={styles.shell}>
          <div style={styles.card}>
            <div style={styles.header}>
              <p style={styles.eyebrow}>{copy.eyebrow}</p>
              <h1 style={styles.title}>{copy.title}</h1>
            </div>
            <div style={styles.content}>
              <table
                role="presentation"
                width="100%"
                cellPadding="0"
                cellSpacing="0"
                style={{ borderCollapse: "collapse" }}
              >
                <tbody>
                  {rows.map(([label, value]) => (
                    <tr key={label}>
                      <td style={{ ...styles.row, ...styles.label }}>{label}</td>
                      <td style={{ ...styles.row, ...styles.value }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p style={styles.messageLabel}>{copy.message}</p>
              <p style={styles.message}>{lead.message}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

export function buildLeadNotificationText(lead: LeadNotificationData): string {
  const copy = getCopy(lead.locale);
  const fields = [
    `${copy.name}: ${lead.name}`,
    `${copy.email}: ${lead.email}`,
    lead.company ? `${copy.company}: ${lead.company}` : null,
    `${copy.projectType}: ${lead.projectType}`,
    lead.budget ? `${copy.budget}: ${lead.budget}` : null,
  ].filter((line): line is string => Boolean(line));

  return [
    copy.title,
    "",
    ...fields,
    "",
    `${copy.message}:`,
    lead.message,
  ].join("\n");
}
