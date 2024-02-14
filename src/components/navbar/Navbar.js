import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='logo'>Home Automation</div>
        <ul className='menu'>
            <li>Home</li>
            <li>About</li>
            <li>Products</li>
            <li>Services</li>
        </ul>
        <button className='contact-button'>Contact</button>
    </div>
  )
}

export default Navbar