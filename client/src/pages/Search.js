import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/Search'

const Search = () => {
    const [values,setValues] = useSearch()
  return (
    <Layout>
        <div className='container'>
            <div className='text-center mt-4'>
                <h1 style={{ fontFamily: 'Playfair Display, serif' }}>Search Results</h1>
                <h6 style={{ fontFamily: 'Playfair Display, serif' }} className='mb-4'>
                {values?.results.length < 1 
                ? "No Products Found"
                :`Found ${values?.results.length}`}
                </h6>
                <div className='row product-grid'>
            {values?.results.map((p) => (
              <div key={p._id} className='col-lg-3 col-md-4 col-sm-6 mb-4'>
                <div className='card product-card'>
                  <img src={`/api/v1/product/product-photo/${p._id}`} className='card-img-top product-card-img' alt={p.name} />
                  <div className='card-body'>
                    <h5 className='card-title product-card-title'>{p.name}</h5>
                    <p className='card-text product-card-text'>{p.description}</p>
                    <p className='card-text product-card-price'>$ {p.price}</p>
                    <div className='button-group'>
                      <button className='btn btn-primary btn-sm product-button'>Details</button>
                      <button className='btn btn-secondary btn-sm product-button'>Add To Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
            </div>
        </div>
    </Layout>
  )
}

export default Search