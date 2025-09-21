import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-3">Who am I?</h2>
        <p className="text-gray-700 dark:text-gray-300">
          I’m Rishabh — a security-focused developer and researcher with practical experience in penetration testing, secure system design and applied network security research.
        </p>

        <ul className="mt-4 list-disc list-inside text-gray-700">
          <li>Delivered secure system designs (CCTV encryption, tamper detection) and full risk assessments for stakeholders.</li>
          <li>Implemented ML-based IDS prototypes and optimised detection using feature engineering and realistic simulation.</li>
          <li>Experienced building and deploying web applications on AWS and maintaining production VMs.</li>
        </ul>
      </div>
    </section>
  );
}

