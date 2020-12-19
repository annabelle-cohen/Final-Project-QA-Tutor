package acs.data.convertor;

import org.springframework.stereotype.Component;

import acs.boundaries.CategoryBoundary;
import acs.data.entity.CategoryEntity;


@Component
public class CategoryConverter {

	public CategoryBoundary toBoundary(CategoryEntity e ) {
		CategoryBoundary b = new CategoryBoundary();
		
		b.setCategoryID(e.getCategoryID());
		b.setCatgeroyName(e.getCatgeroyName());
		b.setThumbnail(e.getThumbnail());
		b.setDescription(e.getDescription());
		
		return b ;
	}
	
	
}
