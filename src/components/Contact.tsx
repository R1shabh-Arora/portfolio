import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-3">Let’s connect</h2>
        <p className="text-gray-600 mb-6">Have a question or want to work together? I’m open to roles and consultancy in security engineering and research.</p>

        <div className="grid gap-4">
          <div className="p-4 border rounded">
            <div className="font-medium">Email</div>
            <div className="text-sm text-gray-600">0.rishabh.arora.0@gmail.com</div>
          </div>

          <div className="p-4 border rounded">
            <div className="font-medium">Mobile (UK)</div>
            <div className="text-sm text-gray-600">+44 7831 284705</div>
            <div className="font-medium mt-2">GitHub / LinkedIn</div>
            <div className="text-sm text-gray-600">
              <a href="https://github.com/R1shabh-Arora" className="underline">github.com/R1shabh-Arora</a> •{' '}
              <a href="https://linkedin.com/in/R1shabh-Arora" className="underline">linkedin.com/in/R1shabh-Arora</a>
            </div>
          </div>

          <div className="p-4 border rounded">
            <div className="font-medium">Message</div>
            <form className="mt-2 grid gap-2">
              <input name="name" placeholder="Name" className="p-2 border rounded" />
              <input name="email" placeholder="Email" className="p-2 border rounded" />
              <textarea name="message" placeholder="Message" className="p-2 border rounded" rows={4} />
              <div className="flex gap-2">
                <button type="button" className="px-4 py-2 rounded bg-indigo-600 text-white">Send via Email</button>
                <a href="https://linkedin.com/in/R1shabh-Arora" className="px-4 py-2 rounded border">Message on LinkedIn</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
