package acs.logic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import acs.boundaries.ProductBoundary;
import acs.dal.CartDao;
import acs.dal.ProductDao;
import acs.dal.UserDao;
import acs.data.convertor.ProductConverter;
import acs.data.entity.CartEntity;
import acs.data.entity.CategoryEntity;
import acs.data.entity.ImageEntity;
import acs.data.entity.ProductEntity;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.FileReader;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

import javax.annotation.PostConstruct;

@Service
public class ProductService {

	class CategoryIO {
		String categoryID;
		String CategoryName;
		String CategoryPath;
		List<String> variations = new ArrayList<String>();

	}

	@Autowired
	private ProductDao productDao;

	@Autowired
	private CartDao cartDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private ProductConverter productConverter;

	public ProductService() {

	}

	Object getValue(JSONArray arr) {

		if (arr == null) {
			return null;
		}

		Object obj = (Object) arr.get(0);

		return obj;
	}

	@PostConstruct
	@Transactional
	private void initData() {

		JSONParser parser = new JSONParser();
		try {

			List<CategoryIO> cats = this.initCategories();

			for (CategoryIO _cat : cats) {

				Object obj = parser.parse(new FileReader(_cat.CategoryPath));

				String categoryId = _cat.categoryID;
				String categoryName = _cat.CategoryName;

				JSONArray main = new JSONArray();
				main.add(obj);

				JSONObject result = (JSONObject) (((JSONArray) main.get(0)).get(0));

				JSONArray searchResult = (JSONArray) ((result).get("searchResult"));
				JSONArray items = (JSONArray) ((JSONObject) searchResult.get(0)).get("item");

				Iterator<JSONObject> iterator = items.iterator();
				while (iterator.hasNext()) {

					// if (productCount == 50) {
					// break;
					// }

					ProductEntity prod = new ProductEntity();
					JSONObject item = iterator.next();

					// System.out.println(item);

					String title = (String) ((JSONArray) item.get("title")).get(0);
					String subtitle = (String) this.getValue((JSONArray) item.get("subtitle"));
					String itemId = (String) ((JSONArray) item.get("itemId")).get(0);
					String location = (String) ((JSONArray) item.get("location")).get(0);

					JSONObject sellingStatus = (JSONObject) ((JSONArray) item.get("sellingStatus")).get(0);
					JSONObject currentPrice = (JSONObject) ((JSONArray) sellingStatus.get("currentPrice")).get(0);
					String currentPriceValue = (String) currentPrice.get("__value__");

					JSONObject sellerInfo = (JSONObject) ((JSONArray) item.get("sellerInfo")).get(0);
					((JSONArray) sellerInfo.get("sellerUserName")).get(0);
					((JSONArray) sellerInfo.get("positiveFeedbackPercent")).get(0);

					String shippingServiceCostValue = "";
					try {
						JSONObject shippingInfo = (JSONObject) ((JSONArray) item.get("shippingInfo")).get(0);
						JSONObject shippingServiceCost = (JSONObject) ((JSONArray) shippingInfo
								.get("shippingServiceCost")).get(0);
						shippingServiceCostValue = (String) shippingServiceCost.get("__value__");
					} catch (Exception e) {
						shippingServiceCostValue = "0.0";
					}

					String conditionDisplayName = "";
					try {
						JSONObject condition = (JSONObject) ((JSONArray) item.get("condition")).get(0);
						conditionDisplayName = (String) ((JSONArray) condition.get("conditionDisplayName")).get(0);

					} catch (Exception e) {
						conditionDisplayName = "New";
					}

					((JSONArray) item.get("primaryCategory")).get(0);

					prod.setProductID(Long.parseLong(itemId));
					prod.setTitle(title);
					prod.setSubtitle(subtitle);
					prod.setLocation(location);
					prod.setUnitPrice(Double.parseDouble(currentPriceValue));

					long unitInStock = ThreadLocalRandom.current().nextLong(1, 30);
					prod.setUnitsInStock(unitInStock);
					prod.setUnitsOnOrder(0L);

					prod.setProductCondition(conditionDisplayName);
					prod.setShippingServiceCost(Double.parseDouble(shippingServiceCostValue));

					// category

					Long categoryID = Long.parseLong(categoryId);
					CategoryEntity cat = this.categoryService.isCategroyAvailable(categoryID);
					if (cat == null) {
						cat = new CategoryEntity();
						cat.setCategoryID(categoryID);
						cat.setCatgeroyName(categoryName);
						cat = this.categoryService.getCategoryDao().save(cat);
					}

					Optional<ProductEntity> exsisting = this.productDao.findById(prod.getProductID());
					if (exsisting.isPresent()) {

						System.out.println("item already exists : " + exsisting.get().getProductID());
						continue;
					}

					prod.addCategory(cat);
					// prod.addCategory(cat);
					// this.categoryService.getCategoryDao().save(cat);

					this.productDao.save(prod);

				}

				this.addProductDetails(_cat.variations);

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Transactional
	public void addProductDetails(List<String> productsDetails) {

		JSONParser parser = new JSONParser();
		try {

			for (String path : productsDetails) {
				Object obj = parser.parse(new FileReader(path));

				JSONArray main = new JSONArray();
				main.add(obj);

				JSONArray items = (JSONArray) ((JSONObject) main.get(0)).get("Item");

				Iterator<JSONObject> iterator = items.iterator();
				while (iterator.hasNext()) {

					JSONObject item = iterator.next();

					// System.out.println(item);

					List<String> PictureURLs = ((JSONArray) item.get("PictureURL"));
					String itemId = (String) item.get("ItemID");
					Long itemID = Long.parseLong(itemId);
					Optional<ProductEntity> entity = this.productDao.findById(itemID);

					if (entity.isPresent()) {
						ProductEntity product = entity.get();

						for (String imageUrl : PictureURLs) {
							ImageEntity imgEntity = new ImageEntity();
							imgEntity.setSource(imageUrl);
							product.addImage(imgEntity);
						}

						this.productDao.save(product);

					}

				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private List<CategoryIO> initCategories() {

		List<CategoryIO> cats = new ArrayList<ProductService.CategoryIO>();

		{
			List<String> files = new ArrayList<>();

			CategoryIO cat = new CategoryIO();
			files.add("data/Cell Phones & Accessories-15032-Variations(0-20).json");
			files.add("data/Cell Phones & Accessories-15032-Variations(20-40).json");
			files.add("data/Cell Phones & Accessories-15032-Variations(40-60).json");
			files.add("data/Cell Phones & Accessories-15032-Variations(60-80).json");
			files.add("data/Cell Phones & Accessories-15032-Variations(80-100).json");

			String catPath = "data/Cell Phones & Accessories-15032.json";

			String categoryId = "15032";
			String categoryName = "Cell Phones & Accessories";

			cat.CategoryPath = catPath;
			cat.categoryID = categoryId;
			cat.CategoryName = categoryName;
			cat.variations = files;

			cats.add(cat);
		}

		{
			List<String> files = new ArrayList<>();
			files.add("data/Computers&Tablets & Networking-58058-Variations(0-20).json");
			files.add("data/Computers&Tablets & Networking-58058-Variations(20-40).json");
			files.add("data/Computers&Tablets & Networking-58058-Variations(40-60).json");
			files.add("data/Computers&Tablets & Networking-58058-Variations(60-80).json");
			files.add("data/Computers&Tablets & Networking-58058-Variations(80-100).json");

			String catPath2 = "data/Computers&Tablets & Networking-58058.json";

			String categoryId2 = "58058";
			String categoryName2 = "Computers& Tablets & Networking";

			CategoryIO cat2 = new CategoryIO();

			cat2.CategoryPath = catPath2;
			cat2.categoryID = categoryId2;
			cat2.CategoryName = categoryName2;
			cat2.variations = files;

			cats.add(cat2);
		}

		{
			List<String> files = new ArrayList<>();
			files.add("data/Camera Drones-179697-Variations(0-20).json");
			files.add("data/Camera Drones-179697-Variations(20-40).json");
			files.add("data/Camera Drones-179697-Variations(40-60).json");
			files.add("data/Camera Drones-179697-Variations(60-80).json");
			files.add("data/Camera Drones-179697-Variations(80-100).json");

			String catPath2 = "data/Camera Drones-179697.json";

			String categoryId2 = "179697";
			String categoryName2 = "Camera Drones";

			CategoryIO cat2 = new CategoryIO();

			cat2.CategoryPath = catPath2;
			cat2.categoryID = categoryId2;
			cat2.CategoryName = categoryName2;
			cat2.variations = files;

			cats.add(cat2);
		}

		{
			List<String> files = new ArrayList<>();
			files.add("data/Digital Cameras & Photo-31388-Variations(0-20).json");
			files.add("data/Digital Cameras & Photo-31388-Variations(20-40).json");
			files.add("data/Digital Cameras & Photo-31388-Variations(40-60).json");
			files.add("data/Digital Cameras & Photo-31388-Variations(60-80).json");
			files.add("data/Digital Cameras & Photo-31388-Variations(80-100).json");

			String catPath2 = "data/Digital Cameras & Photo-31388.json";

			String categoryId2 = "31388";
			String categoryName2 = "Digital Cameras & Photo";

			CategoryIO cat2 = new CategoryIO();

			cat2.CategoryPath = catPath2;
			cat2.categoryID = categoryId2;
			cat2.CategoryName = categoryName2;
			cat2.variations = files;

			cats.add(cat2);
		}

		{
			List<String> files = new ArrayList<>();
			files.add("data/Smart Watches-178893-Variations(0-20).json");
			files.add("data/Smart Watches-178893-Variations(20-40).json");
			files.add("data/Smart Watches-178893-Variations(40-60).json");
			files.add("data/Smart Watches-178893-Variations(60-80).json");
			files.add("data/Smart Watches-178893-Variations(80-100).json");

			String catPath2 = "data/Smart Watches-178893.json";

			String categoryId2 = "178893";
			String categoryName2 = "Smart Watches";

			CategoryIO cat2 = new CategoryIO();

			cat2.CategoryPath = catPath2;
			cat2.categoryID = categoryId2;
			cat2.CategoryName = categoryName2;
			cat2.variations = files;

			cats.add(cat2);
		}

		{
			List<String> files = new ArrayList<>();
			files.add("data/Video Games & Consoles-1249-Variations(0-20).json");
			files.add("data/Video Games & Consoles-1249-Variations(20-40).json");
			files.add("data/Video Games & Consoles-1249-Variations(40-60).json");
			files.add("data/Video Games & Consoles-1249-Variations(60-80).json");
			files.add("data/Video Games & Consoles-1249-Variations(80-100).json");

			String catPath2 = "data/Video Games & Consoles-1249.json";

			String categoryId2 = "1249";
			String categoryName2 = "Video Games & Consoles";

			CategoryIO cat2 = new CategoryIO();

			cat2.CategoryPath = catPath2;
			cat2.categoryID = categoryId2;
			cat2.CategoryName = categoryName2;
			cat2.variations = files;

			cats.add(cat2);
		}

		return cats;
	}

	@Transactional(readOnly = true)
	public List<ProductBoundary> getProducstByCategroyID(Long categoryID, int page, int size) {

		CategoryEntity cat = this.categoryService.isCategroyAvailable(categoryID);

		if (cat != null) {

			PagedListHolder<ProductEntity> productsPage = new PagedListHolder<ProductEntity>(
					new ArrayList<ProductEntity>(cat.getProducts()));

			productsPage.setPageSize(size);
			productsPage.setPage(page);

			List<ProductEntity> products = productsPage.getPageList();

			List<ProductBoundary> boundary = new ArrayList<>();

			products.forEach((p) -> {
				boundary.add(this.productConverter.toBoundary(p));
			});

			return boundary;
		} else {
			throw new RuntimeException("category doesn't exist");
		}

	}

	@Transactional(readOnly = true)
	public List<ProductBoundary> getProducstByKeyword(String keyword, int page, int size) {

		Page<ProductEntity> results = this.productDao.findByTitleContainingIgnoreCase(keyword,
				PageRequest.of(page, size));

		List<ProductEntity> products = results.getContent();

		List<ProductBoundary> boundary = new ArrayList<>();

		products.forEach((p) -> {
			boundary.add(this.productConverter.toBoundary(p));
		});

		return boundary;

	}

	@Transactional
	public void addProductToCart(Long productID, Long CartID) {

		Optional<ProductEntity> results = this.productDao.findById(productID);

		if (!results.isPresent()) {
			throw new RuntimeException("product doesn't exist :" + productID);
		}

		Optional<CartEntity> cartResult = this.cartDao.findById(CartID);

		if (!cartResult.isPresent()) {
			throw new RuntimeException("cart doesn't exist :" + productID);
		}

		
		ProductEntity product = results.get();
		
		if (product.getUnitsInStock()<=0) {
			throw new RuntimeException("product is not in stock:" + productID);
		}
		

		CartEntity cart = cartResult.get();

		
		cart.addProduct(product);
		
		
		
		this.cartDao.save(cart);

	}

	@Transactional
	public void removeProductFromCart(Long productID, Long CartID) {

		Optional<ProductEntity> results = this.productDao.findById(productID);

		if (!results.isPresent()) {
			throw new RuntimeException("product doesn't exist :" + productID);
		}

		Optional<CartEntity> cartResult = this.cartDao.findById(CartID);

		if (!cartResult.isPresent()) {
			throw new RuntimeException("cart doesn't exist :" + CartID);
		}

		ProductEntity product = results.get();

		CartEntity cart = cartResult.get();

		cart.removeProduct(product);

		this.cartDao.save(cart);

	}
	
	

}
