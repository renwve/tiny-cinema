/**
 * Program: Tiny Cinema
 * Date: August 12, 2026
 * Description: This component provides the shared contact and copyright footer for the movie collection page.
 * Input: It requires no properties or user-entered data because its content is fixed.
 * Processing and Output: It groups the application identity and contact details and outputs a semantic footer element.
 */

// Footer content: display branding, contact information, and ownership details.
export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div>
        <h3>tiny cinema</h3>
        <p>Your simple internet movies rental database.</p>
      </div>

      <div>
        <p>Email: imr@tinycinema.com</p>
        <p>Phone: (555) 123-4567</p>
      </div>

      <div>
        <p>© 2026 IMR tiny cinema</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
}
