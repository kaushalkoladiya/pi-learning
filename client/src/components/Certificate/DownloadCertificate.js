import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CertificateDocument from '.';

const DownloadCertificate = ({ studentName, courseName, issueDate, instructor }) => (
  <div>
    <PDFDownloadLink
      document={
        <CertificateDocument
          studentName={studentName}
          courseName={courseName}
          issueDate={issueDate}
          instructor={instructor}
        />}
      fileName={`${studentName}_Certificate.pdf`}
    >
      {({ loading }) => (loading ? 'Generating certificate...' : 'Download Certificate')}
    </PDFDownloadLink>
  </div>
);

export default DownloadCertificate;
