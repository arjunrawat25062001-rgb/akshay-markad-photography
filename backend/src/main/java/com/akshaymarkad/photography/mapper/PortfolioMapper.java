package com.akshaymarkad.photography.mapper;

import com.akshaymarkad.photography.dto.PortfolioItemDto;
import com.akshaymarkad.photography.entity.PortfolioItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PortfolioMapper {
    @Mapping(source = "coverImageUrl", target = "coverImageUrl")
    PortfolioItemDto toDto(PortfolioItem item);
}
