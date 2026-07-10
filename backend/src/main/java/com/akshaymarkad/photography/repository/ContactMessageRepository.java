package com.akshaymarkad.photography.repository;

import com.akshaymarkad.photography.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

}
