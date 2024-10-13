export default function Blog() {
  return (
    <section id="blog" className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Latest Blog Posts</h2>
      <div className="space-y-4">
        <div className="bg-white bg-opacity-10 p-4 rounded-lg text-white">
          <h3 className="text-xl font-semibold">
            The Future of Web Development
          </h3>
          <p className="text-gray-200 mt-2">
            Exploring upcoming trends and technologies in the world of web
            development.
          </p>
        </div>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg text-white">
          <h3 className="text-xl font-semibold">Mastering React Hooks</h3>
          <p className="text-gray-200 mt-2">
            A comprehensive guide to using React Hooks effectively in your
            projects.
          </p>
        </div>
        <div className="bg-white bg-opacity-10 p-4 rounded-lg text-white">
          <h3 className="text-xl font-semibold">
            Building Scalable Backend Services
          </h3>
          <p className="text-gray-200 mt-2">
            Best practices for creating robust and scalable backend services
            with Node.js.
          </p>
        </div>
      </div>
    </section>
  );
}
