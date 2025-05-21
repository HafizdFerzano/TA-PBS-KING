// app/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold title-font">Shape Explorer</h3>
            <p className="mt-2 text-blue-200">
              Making geometry fun for young learners
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-2xl text-blue-300 hover:text-white">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-2xl text-blue-300 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-2xl text-blue-300 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-2xl text-blue-300 hover:text-white">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-blue-800 text-center text-blue-300 text-sm">
          <p>
            &copy; 2023 Shape Explorer. All rights reserved. |
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>{" "}
            |
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </p>
          <p className="mt-2">
            Made with <i className="fas fa-heart text-red-400"></i> for young
            learners everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
