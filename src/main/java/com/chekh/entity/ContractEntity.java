package com.chekh.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "contract", schema = "public", catalog = "advertising_agency")
public class ContractEntity {
    private Long contractId;
    private Long advertiserId;
    private Long adId;
    private Long sellerId;
    private Long checkId;
    private AdvertiserEntity advertiser;
    private AdEntity ad;
    private SellerEntity seller;
    private CheckEntity check;

    @Id
    @Column(name = "contract_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getContractId() {
        return contractId;
    }

    public void setContractId(Long contractId) {
        this.contractId = contractId;
    }

    @Basic
    @Column(name = "advertiser_id")
    public Long getAdvertiserId() {
        return advertiserId;
    }

    public void setAdvertiserId(Long advertiserId) {
        this.advertiserId = advertiserId;
    }

    @Basic
    @Column(name = "ad_id")
    public Long getAdId() {
        return adId;
    }

    public void setAdId(Long adId) {
        this.adId = adId;
    }

    @Basic
    @Column(name = "seller_id")
    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    @Basic
    @Column(name = "check_id")
    public Long getCheckId() {
        return checkId;
    }

    public void setCheckId(Long checkId) {
        this.checkId = checkId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ContractEntity that = (ContractEntity) o;
        return Objects.equals(contractId, that.contractId) &&
                Objects.equals(advertiserId, that.advertiserId) &&
                Objects.equals(adId, that.adId) &&
                Objects.equals(sellerId, that.sellerId) &&
                Objects.equals(checkId, that.checkId);
    }

    @Override
    public int hashCode() {
        int result = contractId != null ? contractId.hashCode() : 0;
        result = 31 * result + (advertiserId != null ? advertiserId.hashCode() : 0);
        result = 31 * result + (adId != null ? adId.hashCode() : 0);
        result = 31 * result + (sellerId != null ? sellerId.hashCode() : 0);
        result = 31 * result + (checkId != null ? checkId.hashCode() : 0);
        return result;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "advertiser_id", referencedColumnName = "advertiser_id", insertable = false, updatable = false)
    public AdvertiserEntity getAdvertiser() {
        return advertiser;
    }

    public void setAdvertiser(AdvertiserEntity advertiser) {
        this.advertiser = advertiser;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "ad_id", referencedColumnName = "ad_id", insertable = false, updatable = false)
    public AdEntity getAd() {
        return ad;
    }

    public void setAd(AdEntity ad) {
        this.ad = ad;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "seller_id", referencedColumnName = "seller_id", insertable = false, updatable = false)
    public SellerEntity getSeller() {
        return seller;
    }

    public void setSeller(SellerEntity seller) {
        this.seller = seller;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "check_id", referencedColumnName = "check_id", insertable = false, updatable = false)
    public CheckEntity getCheck() {
        return check;
    }

    public void setCheck(CheckEntity check) {
        this.check = check;
    }
}
