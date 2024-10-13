import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';

export default function Contact() {
  return (
    <section id="contact" className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Contact Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
        <div>
          <p className="flex items-center">
            <FaEnvelope className="mr-2 text-purple-200" /> john.doe@example.com
          </p>
          <p className="flex items-center mt-2">
            <FaPhone className="mr-2 text-purple-200" /> (123) 456-7890
          </p>
        </div>
        <div>
          <p className="flex items-center">
            <FaLinkedin className="mr-2 text-purple-200" />{' '}
            linkedin.com/in/johndoe
          </p>
          <p className="flex items-center mt-2">
            <FaGithub className="mr-2 text-purple-200" /> github.com/johndoe
          </p>
        </div>
      </div>
    </section>
  );
}
