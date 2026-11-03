'use client';

import { useEffect, useMemo, useState } from 'react';

type Product = { id: number; name: string; category: string; price: number; oldPrice?: number; image: string; tag?: string; color: string };
type CartItem = { product: Product; qty: number };

const products: Product[] = [
  { id: 1, name: 'The Sculpted Blazer', category: 'Clothing', price: 189, oldPrice: 240, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85', tag: 'BESTSELLER', color: 'Oatmeal' },
  { id: 2, name: 'Everyday Leather Tote', category: 'Bags', price: 145, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85', tag: 'NEW ARRIVAL', color: 'Cognac' },
  { id: 3, name: 'The Essential Knit', category: 'Clothing', price: 98, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85', color: 'Ivory' },
  { id: 4, name: 'Luna Minimal Heel', category: 'Shoes', price: 160, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85', tag: 'LIMITED', color: 'Espresso' },
  { id: 5, name: 'Weekend Tailored Trouser', category: 'Clothing', price: 120, image: 'https://images.unsplash.com/photo-1506629905607-d9a7d4d7b7d7?auto=format&fit=crop&w=900&q=85', color: 'Stone' },
  { id: 6, name: 'The City Shoulder Bag', category: 'Bags', price: 210, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85', color: 'Black' },
  { id: 7, name: 'Sculpted Gold Cuff', category: 'Accessories', price: 68, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85', tag: 'EDITOR’S PICK', color: 'Gold' },
  { id: 8, name: 'Classic Leather Loafer', category: 'Shoes', price: 175, image: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&w=900&q=85', color: 'Chocolate' },
];
const categories = ['All', 'Clothing', 'Bags', 'Shoes', 'Accessories'];
const money = (n: number) => `$${n.toFixed(2)}`;

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [notice, setNotice] = useState('');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    try { const saved = localStorage.getItem('vogue-cart'); if (saved) setCart(JSON.parse(saved)); } catch { /* ignore invalid saved cart */ }
  }, []);
  useEffect(() => { localStorage.setItem('vogue-cart', JSON.stringify(cart)); }, [cart]);

  const visibleProducts = useMemo(() => {
    let list = products.filter(p => (category === 'All' || p.category === category) && `${p.name} ${p.category} ${p.color}`.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'low') list = [...list].sort((a,b) => a.price-b.price);
    if (sort === 'high') list = [...list].sort((a,b) => b.price-a.price);
    return list;
  }, [category, search, sort]);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  function addToCart(product: Product) {
    setCart(current => { const found = current.find(i => i.product.id === product.id); return found ? current.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i) : [...current, { product, qty: 1 }]; });
    setNotice(`${product.name} added to your bag`); setTimeout(() => setNotice(''), 2400);
  }
  function changeQty(id: number, delta: number) {
    setCart(current => current.map(i => i.product.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));
  }

  return <main>
    <div className="announcement">COMPLIMENTARY SHIPPING ON ORDERS OVER $150 <span>✦</span> DISCOVER THE NEW SEASON</div>
    <header className="header">
      <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">☰</button>
      <nav className={mobileMenu ? 'nav nav-open' : 'nav'}><a href="#collection" onClick={() => setMobileMenu(false)}>NEW IN</a><a href="#collection" onClick={() => {setCategory('Clothing');setMobileMenu(false)}}>CLOTHING</a><a href="#collection" onClick={() => {setCategory('Bags');setMobileMenu(false)}}>BAGS</a><a href="#story" onClick={() => setMobileMenu(false)}>OUR STORY</a></nav>
      <a className="logo" href="#top" aria-label="VOGUE home">VOGUE<span>®</span><small>THE ART OF DRESSING WELL</small></a>
      <div className="header-actions"><a className="search-link" href="#collection">SEARCH</a><button className="bag-button" onClick={() => setCartOpen(true)}>BAG <span>{count}</span></button></div>
    </header>

    <section className="hero" id="top">
      <div className="hero-image" />
      <div className="hero-shade" />
      <div className="hero-copy"><p className="eyebrow light">THE AUTUMN / WINTER EDITION</p><h1>Quietly<br/><em>exceptional.</em></h1><p className="hero-sub">Considered pieces. Lasting impressions.<br/>A new perspective on everyday dressing.</p><a className="light-button" href="#collection">EXPLORE THE COLLECTION <span>↗</span></a></div>
      <div className="hero-index">01 / 03 <span>—</span> THE NEW STANDARD</div>
    </section>

    <section className="intro" id="story"><p className="eyebrow">A MORE CONSIDERED WARDROBE</p><h2>Style is not about being seen.<br/><em>It’s about being remembered.</em></h2><p>Modern essentials, thoughtfully selected. Discover timeless silhouettes and elevated details designed to move with you.</p></section>

    <section className="collection section-wrap" id="collection">
      <div className="section-heading"><div><p className="eyebrow">CURATED FOR YOU</p><h2>The collection<span>.</span></h2></div><div className="collection-note">Pieces to keep.<br/>Styles to return to.</div></div>
      <div className="toolbar"><div className="category-tabs">{categories.map(c => <button key={c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div><div className="filters"><input aria-label="Search products" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search pieces…"/><select aria-label="Sort products" value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div></div>
      <div className="product-grid">{visibleProducts.map((p, index) => <article className="product-card" key={p.id}><div className="product-image-wrap"><img src={p.image} alt={p.name}/>{p.tag && <span className="product-tag">{p.tag}</span>}<button className="quick-add" onClick={() => addToCart(p)}>ADD TO BAG <span>＋</span></button></div><div className="product-info"><div><h3>{p.name}</h3><p>{p.color} · {p.category}</p></div><div className="price">{p.oldPrice && <del>{money(p.oldPrice)}</del>}{money(p.price)}</div></div></article>)}</div>
      {visibleProducts.length === 0 && <div className="empty-results">No pieces found. Try another search or category.</div>}
      <div className="view-all"><span>SHOWING {visibleProducts.length} OF {products.length} PIECES</span><button onClick={() => {setCategory('All');setSearch('');setSort('featured')}}>VIEW ALL PRODUCTS ↗</button></div>
    </section>

    <section className="campaign"><div className="campaign-photo"/><div className="campaign-copy"><p className="eyebrow">THE VOGUE POINT OF VIEW</p><h2>Less, but<br/><em>better.</em></h2><p>We believe in buying fewer things, choosing well, and making them last. A wardrobe built around intention, not impulse.</p><a href="#collection" className="text-link">DISCOVER OUR PHILOSOPHY ↗</a></div></section>

    <section className="newsletter"><p className="eyebrow">A NOTE FROM VOGUE</p><h2>Good things, <em>occasionally.</em></h2><p>New arrivals, thoughtful edits and a little inspiration. No noise, just the good stuff.</p><form onSubmit={e => {e.preventDefault();setNotice('Thank you for joining the VOGUE list.');setTimeout(()=>setNotice(''),2800);}}><input type="email" placeholder="Your email address" required/><button type="submit">SUBSCRIBE ↗</button></form><small>By subscribing, you agree to receive occasional emails from VOGUE.</small></section>

    <footer className="footer"><div className="footer-top"><div><a className="footer-logo" href="#top">VOGUE<span>®</span></a><p>THE ART OF DRESSING WELL</p></div><div><h4>EXPLORE</h4><a href="#collection">New arrivals</a><a href="#collection">Clothing</a><a href="#collection">Accessories</a></div><div><h4>HELP</h4><a href="#footer">Shipping & returns</a><a href="#footer">Contact us</a><a href="#footer">FAQs</a></div><div><h4>FOLLOW ALONG</h4><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://pinterest.com" target="_blank" rel="noreferrer">Pinterest ↗</a></div></div><div className="footer-bottom" id="footer"><span>© 2026 VOGUE STUDIO. ALL RIGHTS RESERVED.</span><span>MADE WITH INTENTION. <a href="#top">BACK TO TOP ↑</a></span></div></footer>

    {notice && <div className="toast">{notice}</div>}
    {cartOpen && <div className="overlay" onMouseDown={e => {if(e.target === e.currentTarget)setCartOpen(false)}}><aside className="cart-drawer"><div className="drawer-head"><div><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({count})</span></h2></div><button onClick={() => setCartOpen(false)} aria-label="Close bag">×</button></div>{cart.length === 0 ? <div className="cart-empty"><div>◇</div><h3>Your bag is waiting.</h3><p>Discover something exceptional.</p><button onClick={() => setCartOpen(false)}>CONTINUE SHOPPING ↗</button></div> : <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.product.id}><img src={item.product.image} alt={item.product.name}/><div className="cart-item-info"><h3>{item.product.name}</h3><p>{item.product.color}</p><strong>{money(item.product.price)}</strong><div className="qty"><button onClick={() => changeQty(item.product.id,-1)}>−</button><span>{item.qty}</span><button onClick={() => changeQty(item.product.id,1)}>＋</button></div></div><button className="remove" onClick={() => setCart(c => c.filter(i => i.product.id !== item.product.id))}>REMOVE</button></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Shipping and taxes calculated at checkout.</p><button className="checkout-button" onClick={() => setCheckoutOpen(true)}>CONTINUE TO CHECKOUT ↗</button><button className="continue-link" onClick={() => setCartOpen(false)}>CONTINUE SHOPPING</button></div></>}</aside></div>}
    {checkoutOpen && <div className="overlay modal-overlay"><div className="checkout-modal"><button className="modal-close" onClick={() => setCheckoutOpen(false)}>×</button><p className="eyebrow">VOGUE CHECKOUT</p><h2>Almost yours.</h2><p className="demo-note">This is a coursework demo checkout. No payment will be collected and no order will be placed.</p><div className="demo-total"><span>Order total</span><strong>{money(subtotal)}</strong></div><button className="checkout-button" onClick={() => {setCheckoutOpen(false);setCartOpen(false);setCart([]);setNotice('Demo order complete — thank you for exploring VOGUE!');setTimeout(()=>setNotice(''),3500)}}>PLACE DEMO ORDER ↗</button><button className="continue-link" onClick={() => setCheckoutOpen(false)}>GO BACK TO BAG</button></div></div>}
  </main>;
}
