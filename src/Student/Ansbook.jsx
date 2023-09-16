import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer';
import Exam from './Exam';
function Ansbook() {
  return (
    <div>
       <PDFDownloadLink document={<Exam/>} fileName="AnsBook.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download PDF'
        }
      </PDFDownloadLink>
    </div>
  )
}

export default Ansbook
