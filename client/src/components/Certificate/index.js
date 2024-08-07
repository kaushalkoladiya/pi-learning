import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

Font.register({
  family: 'GreatVibes',
  src: 'https://fonts.gstatic.com/s/greatvibes/v8/RWmMoKWR9v4ksMfaWd_JN-XC.ttf',
  // 'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'
})

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f8f8f8',
    padding: 30,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'GreatVibes',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  subtitle: {
    fontSize: 16,
    margin: '10px 0',
  },
  body: {
    fontSize: 12,
    margin: '20px 0',
    textAlign: 'center',
  },
  footer: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  image: {
    width: 150,
    height: 150,
    margin: '0 auto',
    marginBottom: 20,
  },
  certificate: {
    border: '2px solid #4A90E2',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  signature: {
    fontSize: 12,
    marginTop: 20,
    textAlign: 'center',
  },
  greatVibes: {
    fontFamily: 'GreatVibes',
  },
  pageWrapper: {
    border: '2px solid #a0a0a0',
    borderRadius: 5,
    padding: 20,
  },
});

// Create Document Component
const CertificateDocument = ({ studentName, courseName, issueDate, instructor }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.pageWrapper}>
        <View style={styles.certificate}>
          <View style={styles.header}>
            <Image
              source={{
                uri: "https://pilearningcapstone.blob.core.windows.net/pi-learning/pi-learning-logo.png",
                headers: {
                  Pragma: 'no-cache',
                  'Cache-Control': 'no-cache',
                },
                method: 'GET',
                body: '',
              }}
              style={styles.image}
            />
            <Text style={styles.title}>Certificate of Completion</Text>
            <Text style={styles.subtitle}>This is to certify that</Text>
          </View>
          <View style={styles.body}>
            <Text style={{
              marginBottom: 10,
              textDecoration: 'underline',
            }}>{studentName}</Text>
            <Text style={styles.greatVibes}>has successfully completed the course</Text>
            <Text style={{ fontWeight: 700, marginTop: 10 }}>{courseName}</Text>
            <Text style={styles.greatVibes}>on</Text>
            <Text style={styles.greatVibes}>{issueDate}</Text>
          </View>
          <View style={styles.signature}>
            <Text style={styles.greatVibes}>Instructor: {instructor}</Text>
          </View>
          <View style={styles.footer}>
            <Text>Pi Learning</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default CertificateDocument;
