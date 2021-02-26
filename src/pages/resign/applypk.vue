<template>
  <!--pk码申请  -->
  <div id="applypk">
    <a-input
      placeholder="请输入31位PK码"
      v-model="pkcode"
    >
      <a-icon slot="prefix" type="deployment-unit" />
    </a-input>
    <div>
      <a-select
        default-value="请选择pk类型"
        style="width: 30%;margin-bottom:20px"
        @change="handleChange"
      >
        <a-select-option value="0">
          60天试用
        </a-select-option>
        <a-select-option value="1">
          90天试用
        </a-select-option>
        <a-select-option value="2">
          180天试用
        </a-select-option>
        <a-select-option value="3">
          360天试用
        </a-select-option>
        <a-select-option value="4">
          正式（4）
        </a-select-option>
        <a-select-option value="5">
          正式（5）
        </a-select-option>
        <a-select-option value="6">
          正式（6）
        </a-select-option>
        <a-select-option value="7">
          正式（80）
        </a-select-option>
        <a-select-option value="8">
          正式（100）
        </a-select-option>
      </a-select>
    </div>
    <a-button type="primary" @click="success">
      生成
    </a-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pkcode: "" //pk码
    };
  },
  methods: {
    handleChange(value) {
      this.pkcode = this.pkcode + value;
    },
    success() {
      this.$success({
        title: '系统提示',
        // JSX support
        content: (
          <div>
            <p>您申请的PK码为：{this.pkcode}</p>
          </div>
        ),
      });
    },
  }
};
</script>

<style scoped>
#applypk >>> .ant-input {
  width: 30%;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>