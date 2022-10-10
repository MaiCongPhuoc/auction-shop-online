import React from "react";

const ExploreLots = () => {
    return (
        <section className="nav-bar mega-menu">
            <div className="mega-menu__category-wrapper">
                <ul>
                    <li className="category-link view-all">
                        <a href="/categories/view-all/catalog_items?hide=carousel">View All <i className="fal fa-angle-right" aria-hidden="true" /></a>
                    </li>
                    <li className="category-link celebrity" data-categoryid="celebrity"><a href="/categories/celebrity/catalog_items?hide=carousel" data-category-id="celebrity">Celebrity</a></li>
                    <li className="category-link sports" data-categoryid="sports"><a href="/categories/sports/catalog_items?hide=carousel" data-category-id="sports">Sports</a></li>
                    <li className="category-link travel" data-categoryid="travel"><a href="/categories/travel/catalog_items?hide=carousel" data-category-id="travel">Travel</a></li>
                    <li className="category-link music" data-categoryid="music"><a href="/categories/music/catalog_items?hide=carousel" data-category-id="music">Music</a></li>
                    <li className="category-link entertainment" data-categoryid="entertainment"><a href="/categories/entertainment/catalog_items?hide=carousel" data-category-id="entertainment">Entertainment</a></li>
                    <li className="category-link business-experiences" data-categoryid="business-experiences">
                        <a href="/categories/business-experiences/catalog_items?hide=carousel" data-category-id="business-experiences">Business Experiences</a>
                    </li>
                    <li className="category-link food-and-wine" data-categoryid="food-and-wine"><a href="/categories/food-and-wine/catalog_items?hide=carousel" data-category-id="food-and-wine">Food &amp;
                        Wine</a></li>
                    <li className="category-link fashion" data-categoryid="fashion"><a href="/categories/fashion/catalog_items?hide=carousel" data-category-id="fashion">Fashion</a></li>
                    <li className="category-link art-and-collectibles" data-categoryid="art-and-collectibles">
                        <a href="/categories/art-and-collectibles/catalog_items?hide=carousel" data-category-id="art-and-collectibles">Art &amp; Collectibles</a>
                    </li>
                    <li className="category-link merchandise" data-categoryid="merchandise"><a href="/categories/merchandise/catalog_items?hide=carousel" data-category-id="merchandise">Merchandise</a></li>
                    <li className="category-link wellness-and-beauty" data-categoryid="wellness-and-beauty">
                        <a href="/categories/wellness-and-beauty/catalog_items?hide=carousel" data-category-id="wellness-and-beauty">Wellness &amp; Beauty</a>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default ExploreLots;