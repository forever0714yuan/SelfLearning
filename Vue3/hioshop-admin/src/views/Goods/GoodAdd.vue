<template>
  <div class="goods-add">
    <div class="goodsadd-header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/main/goods' }"
          >商品管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="goods-btn">
        <el-button
          type="primary"
          size="large"
          class="savebtn"
          plain
          @click="save"
          >保存</el-button
        >
        <el-button size="large" @click="backList">返回列表</el-button>
      </div>
    </div>
    <el-card>
      <el-form>
        <el-form-item label="商品分类">
          <el-select
            v-model="goodsAddForm.goodsCategory"
            placeholder="请选择商品种类"
          >
            <el-option
              v-for="category in editAllCategory"
              :label="category.label"
              :value="category.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-image
            style="width: 100px; height: 100px"
            :src="infoData.list_pic_url"
            :zoom-rate="1.2"
            :preview-src-list="srcList"
            :initial-index="4"
            fit="cover"
          />
        </el-form-item>
        <el-form-item label="商品轮播图">
          <!-- <draggable v-model="gallery_list" item-key="id">
            <template #item="{ element }">
              <el-image
                style="width: 100px; height: 100px"
                :src="element.url"
                fit="cover"
              />
            </template>
          </draggable> -->
          <draggable
            :list="gallery_list"
            item-key="name"
            class="list-group"
            ghost-class="ghost"
            :move="checkMove"
            @start="dragging = true"
            @end="dragging = false"
          >
            <template #item="{ element }">
              <div class="list-group-item">
                <el-image :src="element.url" fit="fill" />
              </div>
            </template>
          </draggable>
          <el-upload
            style="width: 148px; height: 148px"
            list-type="picture-card"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
          <!-- <el-image
            style="width: 100px; height: 100px"
            :src="infoData.goods_desc"
            :zoom-rate="1.2"
            :preview-src-list="srcList"
            :initial-index="4"
            fit="cover"
          /> -->
        </el-form-item>
        <el-form-item label="商品名称" style="width: 400px">
          <el-input v-model="infoData.name"></el-input>
          <!-- <el-input v-model="goodsAddForm.goodsName"></el-input> -->
        </el-form-item>
        <el-form-item label="商品简介" style="width: 400px">
          <el-input type="textarea" v-model="infoData.goods_brief"></el-input>
        </el-form-item>
        <el-form-item label="商品单位" style="width: 400px">
          <el-input
            v-model="infoData.goods_unit"
            placeholder="请输入件、包、袋"
          ></el-input>
        </el-form-item>
        <el-form-item label="销量" style="width: 400px">
          <el-input
            v-model="infoData.sell_volume"
            placeholder="请输入件、包、袋"
          ></el-input>
        </el-form-item>
        <el-form-item label="型号和价格">
          <el-select
            v-model="goodsAddForm.goodsCategory"
            placeholder="请选择商品种类"
          >
            <el-option
              v-for="(Specification, index) in AllSpecificationData"
              :key="Specification.label"
              :label="Specification.label"
              :value="Specification.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="属性设置" prop="type">
          <el-checkbox-group v-model="goodsAddForm.attributes">
            <el-checkbox label="新品" v-model="infoData.is_new" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="请选择快递方式">
          <el-select
            v-model="goodsAddForm.Express"
            placeholder="请选择快递方式"
          >
            <el-option
              v-for="(item, index) in ExpressDataCategory"
              :label="item.label"
              :key="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="infoData.sort_order" :min="1" :max="10" />
        </el-form-item>
        <el-form-item>
          <el-switch
            v-model="infoData.is_on_sale"
            active-text="上架"
            inactive-text="下架"
          />
        </el-form-item>
        <el-form-item label="商品详情">
          <!-- <Tiptap :goods_desc="infoData.goods_desc"></Tiptap> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" @click="save"
            >确定保存</el-button
          >
          <el-button size="large" @click="backList">返回列表</el-button>
          <el-button
            type="danger"
            size="large"
            class="copybtn"
            @click="copyGood"
            >复制商品</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import draggable from 'vuedraggable';
import { Message, Plus } from '@element-plus/icons-vue';
// import Tiptap from '@/components/Tiptap/Tiptap.vue';
import {
  info,
  getAllCategory,
  getExpressData,
  getGoodsSpec,
  getAllSpecification,
  getGalleryList,
  saveEdite,
  copyGoods,
} from '@/api/goods';
// import { quillEditor } from 'vue-quill-editor';

const route = useRoute();
const router = useRouter();
const goodsAddForm = reactive({
  goodsName: '',
  goodsCategory: 1,
  Express: 14,
  goodsDesc: '',
  goodsUnit: '',
  Acura: '',
  attributes: [],
  sort: 1,
  goodsStaus: false,
});

const url =
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg';
const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
];

// 获取需要展示数据
const showFormData = ref();
const infoData = ref({
  id: null,
  category_id: null,
  goods_number: null,
  list_pic_url: '',
  goods_desc: '',
  name: '',
  goods_brief: '',
  goods_unit: '',
  sell_volume: null,
  is_new: undefined,
  sort_order: undefined,
  is_on_sale: undefined,
  keywords: null,
  retail_price: '',
  min_retail_price: null,
  cost_price: '',
  min_cost_price: null,
  is_index: null,
  https_pic_url: '',
  freight_template_id: null,
  freight_type: null,
  is_delete: null,
});

const cateId = ref();
const getInfoData = async () => {
  const data = { id: route.query?.id };
  const res = await info(data);
  console.log('数据展示', res);
  if (!res.errno) {
    showFormData.value = res.data;
    infoData.value = res.data?.info;
    cateId.value = res.data.category_id;
  }
};
// 商品分类
const editAllCategory = ref();
const getEditAllCategory = async () => {
  const res = await getAllCategory();
  console.log('商品分类', res);
  if (!res.errno) {
    editAllCategory.value = res.data;
  }
};
// 快递模板
const ExpressData = ref();
const ExpressDataCategory = ref();
const getEditExpressData = async () => {
  const res = await getExpressData();
  console.log('快递模板', res);

  if (!res.errno) {
    ExpressData.value = res.data;
    ExpressDataCategory.value = res.data.kd;
  }
};

// 型号和价格表
const GoodsSpecTabelData = ref();
const getEditGoodsSpec = async () => {
  const data = { id: route.query?.id };
  const res = await getGoodsSpec(data);
  console.log('型号和价格表', res);
  if (!res.errno) {
    GoodsSpecTabelData.value = res.data;
  }
};
// 型号和价格
const AllSpecificationData = ref();
const EditAllSpecification = async () => {
  const res = await getAllSpecification();
  console.log('型号和价格', res);

  if (!res.errno) {
    AllSpecificationData.value = res.data;
  }
};
// 商品详情图片
const EditGalleryList = ref();
const gallery_list = ref();

const getEditGalleryList = async () => {
  const data = { goodsId: Number(route.query?.id) };
  const res = await getGalleryList(data);
  console.log('商品详情图片', res);

  if (!res.errno) {
    EditGalleryList.value = res.data;
    gallery_list.value = res.data.galleryData;
  }
};
// 确认保存
const save = async () => {
  console.log(GoodsSpecTabelData.value);
  console.log(infoData.value);

  const data = {
    cateId: cateId.value,
    info: {
      ...infoData.value,
      gallery: gallery_list.value,
    },
    specValue: goodsAddForm.goodsCategory,
    specData: GoodsSpecTabelData.value.specData,
  };
  const res = await saveEdite(data);
  console.log(res);
  if (!res.errno) {
    ElMessage({
      message: '保存成功',
      type: 'success',
    });
  }
};

// 返回列表
const backList = async () => {
  router.push({
    path: '/main/goods',
  });
};
// 复制商品
const copyGood = async () => {
  console.log(route);
  const data = { id: route.query.id };

  const res = await copyGoods(data);

  if (!res.errno) {
    ElMessage({
      message: '复制成功',
      type: 'success',
    });
  }
};
const dragging = ref(false);
const checkMove = (e) => {
  window.console.log('Future index: ' + e.draggedContext.futureIndex);
};

getInfoData();
getEditAllCategory();
getEditExpressData();
getEditGoodsSpec();
EditAllSpecification();
getEditGalleryList();
</script>

<style lang="scss" scoped>
.goodsadd-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.list-group {
  display: flex;
}
.list-group-item {
  width: 148px;
  height: 148px;
}
.goods_desc {
  display: flex;
}
.copybtn {
  position: absolute;
  right: 0;
}
:deep(.goods_desc > p) {
  width: 148px;
  height: 148px;
}
:deep(.goods_desc > p > img) {
  width: 100%;
}
:deep(.savebtn) {
  background-color: #409eff;
  color: aliceblue;
  &:hover {
    background-color: #409eff;
  }
}
</style>
