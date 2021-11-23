<template>
  <div class="container">
    <div class="container-header">
      <div class="header-banner banner-blue banner-blue text-cursor" @click="gotoRouter('/project/achieve/index')">
        <div class="banner-left">
          <div class="u-font-md u-font-weight u-font-color">我的项目</div>
          <div class="u-font-sm"><span class="u-font-lg u-font-weight u-m-r-5">4</span>项</div>
        </div>
        <div class="banner-icon">
          <img src="./images/card-bb1.png" class="icon-size" />
        </div>
      </div>
      <div class="header-banner banner-purple text-cursor" @click="gotoRouter('/achi_type/paper')">
        <div class="banner-left">
          <div class="u-font-md u-font-weight u-font-color">我的论文</div>
          <div class="u-font-sm"><span class="u-font-lg u-font-weight u-m-r-5">1</span>篇</div>
        </div>
        <div class="banner-icon">
          <img src="./images/card-bb2.png" class="icon-size" />
        </div>
      </div>
      <div class="header-banner banner-orange text-cursor">
        <div class="banner-left">
          <div class="u-font-md u-font-weight u-font-color">我的专利</div>
          <div class="u-font-sm"><span class="u-font-lg u-font-weight u-m-r-5">34</span>项</div>
        </div>
        <div class="banner-icon">
          <img src="./images/card-bb3.png" class="icon-size" />
        </div>
      </div>
      <div class="header-banner banner-cyan text-cursor">
        <div class="banner-left">
          <div class="u-font-md u-font-weight u-font-color">我的资产</div>
          <div class="u-font-sm"><span class="u-font-lg u-font-weight u-m-r-5">160</span>万元</div>
        </div>
        <div class="banner-icon">
          <img src="./images/card-bb4.png" class="icon-size" />
        </div>
      </div>
    </div>
    <div class="container-middle">
      <div class="middle-left">
        <div class="figure-header">
          <img src="./images/000121.jpg" class="u-circle-avatar" />
          <div class="avatar-info">
            <div class="info-header u-font-md u-font-weight">鲍虎军</div>
            <div class="info-middle u-font-sm u-font-gray">论文ID：BAO.FJ</div>
            <div class="info-footer u-font-sm u-font-gray">之江实验室</div>
            <div class="info-exclusive u-font-sm">
              <span class="exclusive-btn u-m-r-10">人工智能</span>
              <span class="exclusive-btn u-m-r-10">机器视觉</span>
              <span class="exclusive-btn u-m-r-10">超级计算</span>
              <span class="exclusive-btn">+</span>
            </div>
          </div>
        </div>
        <div class="figure-footer">
          <div class="figure-footer-left">
            <div class="graph-box">
              <graph-echart />
            </div>
          </div>
          <div class="figure-footer-right">
            <div class="ratio-box">
              <ratio-echart />
            </div>
          </div>
        </div>
      </div>
      <div class="middle-right">
        <div class="notice-box">
          <div class="notice-card-header">
            <div class="u-font-md u-font-weight u-card-btns">
              <div
                :class="[activeKey === '1' ? 'notice-card-active' : '', 'notice-card-item']"
                @click="toggleCardByKey('1')"
              >
                通知公告
              </div>
              <div
                :class="[activeKey === '2' ? 'notice-card-active' : '', 'notice-card-item']"
                @click="toggleCardByKey('2')"
              >
                学术会议
              </div>
              <div
                :class="[activeKey === '3' ? 'notice-card-active' : '', 'notice-card-item']"
                @click="toggleCardByKey('3')"
              >
                动态通知
              </div>
            </div>
            <div class="u-font-sm u-font-gray u-m-r-10">
              <i class="el-icon-arrow-left u-m-r-10" />
              <i class="el-icon-arrow-right" />
            </div>
          </div>
          <div class="notice-main">
            <div
              v-for="item in currentData"
              :key="item.id"
              class="notice-item-box u-font-gray u-font-sm text-cursor"
              :title="item.noticeTitle"
            >
              <div class="notice-item-content">
                {{ item.noticeTitle }}
              </div>
              <div class="notice-item-time">{{ item.noticeDate }}</div>
            </div>
          </div>
        </div>
        <div class="counsel-box">
          <div class="counsel-header">
            <div class="u-font-md u-font-weight">最新资讯</div>
            <div class="u-font-sm u-font-gray">
              <i class="el-icon-arrow-left u-m-r-10" />
              <i class="el-icon-arrow-right" />
            </div>
          </div>
          <div class="counsel-main">
            <div v-for="item in counselData" :key="item.id" class="counsel-card-box">
              <div class="counsel-card-title u-font-sm u-font-weight" :title="item.counselTitle">
                {{ item.counselTitle }}
              </div>
              <div class="counsel-card-publish u-font-sm">发布时间：{{ item.counselDate }}</div>
              <div class="counsel-card-remark u-font-sm u-font-gray" :title="item.counselContent">
                {{ item.counselContent }}
              </div>
              <div class="counsel-card-btn">
                <span class="view-btn u-font-sm">查看详情</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-footer">
      <div class="shelters-header">
        <div class="u-flex">
          <div class="u-font-md u-font-weight u-m-r-10">待认领论文备份</div>
          <div class="shelters-search">
            <el-input placeholder="请输入关键词" suffix-icon="el-icon-search" size="mini" />
          </div>
        </div>
        <div>
          <el-button type="text" class="u-font-sm">查看更多>></el-button>
        </div>
      </div>
      <el-table :data="tableData" :row-key="id">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="expand-box u-font-sm">
              <div class="u-font-gray expand-first">
                <span class="paper-label">论文名称：</span>
                <span class="paper-content">{{ props.row.paperName }}</span>
              </div>
              <div class="expand-end"><span class="claim-btn">认领</span></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="期刊名称" prop="JournalNme" />
        <el-table-column label="学科" prop="disciplineName" />
        <el-table-column label="期刊级别" prop="JournalLevel" />
        <el-table-column label="作者" prop="author" />
        <el-table-column label="所属单位" prop="unit" />
        <el-table-column label="年份" prop="year" width="120" />
      </el-table>
    </div>
  </div>
</template>

<script>
import graphEchart from './graphEchart.vue'
import ratioEchart from './ratioEchart.vue'
export default {
  components: {
    'graph-echart': graphEchart,
    'ratio-echart': ratioEchart
  },
  data() {
    return {
      activeKey: '1',
      currentData: [
        {
          id: '121',
          noticeTitle: '关于印发《之江实验室“十四五”发展规划》的通知',
          noticeDate: '2021-11-15 16:22'
        },
        {
          id: '122',
          noticeTitle: '关于疫情防控的紧急提醒',
          noticeDate: '2021-11-04 18:22'
        },
        {
          id: '123',
          noticeTitle: '关于开展“园区服务日”活动的通知',
          noticeDate: '2021-11-04 10:00'
        },
        {
          id: '124',
          noticeTitle: '关于实验室各研究院（中心）官网页面试运行的通知',
          noticeDate: '2021-11-02 13:24'
        }
      ],
      noticeData: [
        {
          id: '121',
          noticeTitle: '关于印发《之江实验室“十四五”发展规划》的通知',
          noticeDate: '2021-11-15 16:22'
        },
        {
          id: '122',
          noticeTitle: '关于疫情防控的紧急提醒',
          noticeDate: '2021-11-04 18:22'
        },
        {
          id: '123',
          noticeTitle: '关于开展“园区服务日”活动的通知',
          noticeDate: ' 2021-11-04 10:00 '
        },
      ],
      afficheData: [
        {
          id: '121',
          noticeTitle: '关于周智慧申报余杭区高层次人才分类认定的公示',
          noticeDate: '2021-11-15'
        },
        {
          id: '122',
          noticeTitle: '之江实验室获批 ITU-T SG20 视觉物联网国际标准新立项',
          noticeDate: '2021-11-06'
        },
        {
          id: '123',
          noticeTitle: '关于2021年科研项目验收结果的公告（一）',
          noticeDate: '2021-11-02'
        }
      ],
      academicData: [
        {
          id: '121',
          noticeTitle: '之江实验室获批 ITU-T SG20 视觉物联网国际标准新立项',
          noticeDate: '2021-11-12 16:22'
        },
        {
          id: '122',
          noticeTitle: '条件保障部信息化中心采购项目公示（2021年11月）',
          noticeDate: '2021-11-09 18:22'
        },
        {
          id: '123',
          noticeTitle: '关于开展“科技创新和体制机制创新” 专题学习的通知',
          noticeDate: ' 2021-11-05 10:00 '
        }
      ],
      counselData: [
        {
          id: '121',
          counselTitle: '集微咨询：算力大爆炸前夜 资本涌入量子与光',
          counselDate: '021-11-15 11:40',
          counselContent:
            '后摩尔时代，全世界的科学家们都在寻找新的计算体系和架构来突破算力瓶颈。算力已然成为当前世界数字经济的新引擎和战略竞争的新焦点。这其中，量子和光被寄予了厚望，并且在经历了数十年的实验室研究和学术探讨之后，终于开始成为一个商业命题。近期，风险...'
        },
        {
          id: '122',
          counselTitle: '第六届睿抗机器人大赛全国总决赛云上开赛',
          counselDate: '2021-11-15 11:38 ',
          counselContent:
            '中国青年报客户端北京11月13日电（中青报中青网记者 李桂杰）由工业和信息化部人才交流中心、RoboCom国际公开赛组委会联合主办，面向全国青少年开展的第六届睿抗机器人大赛（RoboCom2021）全国总决赛今天云上开赛。 活动旨在促进社会各界对机器人发展动态的...'
        },
        {
          id: '123',
          counselTitle: '腾讯也在打元宇宙的主意：公司高层首次表态，已注册百条商标',
          counselDate: '2021-11-15 08:33 ',
          counselContent:
            '撰文/ AI财经社 魏一宁 编辑/ 游勇 11月11日是光棍节，也是腾讯的23岁生日。 每到公司纪念日，腾讯都会给员工发一些特殊的礼品作为纪念。五年前的18岁生日，腾讯过成人礼时，马化腾发出了最壕的一份礼物，向员工每人赠送300股腾讯股票，当时总价值达到17亿港...'
        }
      ],
      tableData: [
        {
          id: '12987121',
          JournalNme: 'AdaShare: Learning What To Share For Efficient Deep Multi-Task Learning',
          disciplineName: '计算机科学与技术',
          JournalLevel: 'Journal of financial',
          author: '鲍虎军',
          unit: '之江实验室',
          year: '2020',
          paperName:
            'Precursor-Based ZnO Nano Inks for Printed Electronics**Research supported by a Zhejiang Provincial Natural Science Foundation of China (No. LQ21F010003 to H.D), a China Postdoctoral Science Foundation (No. 2020M681952 to H.D) and Youth Science Fund Project of Zhejiang Lab (No. 2020MCOAA04 to H.D)'
        },
        {
          id: '12987122',
          JournalNme: 'TDGIA - Effective Injection Attacks on Graph Neural Networks',
          disciplineName: '计算机科学与技术',
          JournalLevel: 'Journal of financial',
          author: '鲍虎军',
          unit: '之江实验室',
          year: '2021',
          paperName:
            'Precursor-Based ZnO Nano Inks for Printed Electronics**Research supported by a Zhejiang Provincial Natural Science Foundation of China (No. LQ21F010003 to H.D), a China Postdoctoral Science Foundation (No. 2020M681952 to H.D) and Youth Science Fund Project of Zhejiang Lab (No. 2020MCOAA04 to H.D)'
        },
        {
          id: '12987123',
          JournalNme: 'Product Knowledge Graph Embedding for E-commerce',
          disciplineName: '计算机科学与技术',
          JournalLevel: 'Journal of financial',
          author: '鲍虎军',
          unit: '之江实验室',
          year: '2019',
          paperName:
            'Precursor-Based ZnO Nano Inks for Printed Electronics**Research supported by a Zhejiang Provincial Natural Science Foundation of China (No. LQ21F010003 to H.D), a China Postdoctoral Science Foundation (No. 2020M681952 to H.D) and Youth Science Fund Project of Zhejiang Lab (No. 2020MCOAA04 to H.D)'
        },
        {
          id: '12987124',
          JournalNme: 'BigGreen at SemEval-2021 Task 1: Lexical Complexity Prediction with Assembly Models',
          disciplineName: '计算机科学与技术',
          JournalLevel: 'Journal of financial',
          author: '鲍虎军',
          unit: '之江实验室',
          year: '2021',
          paperName:
            'Precursor-Based ZnO Nano Inks for Printed Electronics**Research supported by a Zhejiang Provincial Natural Science Foundation of China (No. LQ21F010003 to H.D), a China Postdoctoral Science Foundation (No. 2020M681952 to H.D) and Youth Science Fund Project of Zhejiang Lab (No. 2020MCOAA04 to H.D)'
        }
      ]
    }
  },
  methods: {
    gotoRouter(path) {
      this.$router.push({ path })
    },
    toggleCardByKey(key) {
      this.activeKey = key
      if (key === '2') {
        this.currentData = this.afficheData
      } else if (key === '3') {
        this.currentData = this.academicData
      } else {
        this.currentData = this.noticeData
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 125px);
  overflow: auto;

  .container-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .banner-blue {
      background-image: url('./images/card-bg1.png');
    }
    .banner-purple {
      background-image: url('./images/card-bg2.png');
    }
    .banner-orange {
      background-image: url('./images/card-bg3.png');
    }
    .banner-cyan {
      background-image: url('./images/card-bg4.png');
    }
    .header-banner {
      display: flex;
      justify-content: space-between;
      width: 24.5%;
      height: 100px;
      border-radius: 5px;
      .banner-left {
        height: 60px;
        margin-top: 20px;
        margin-left: 20px;
        line-height: 30px;
        .u-font-color {
          color: rgba(59, 59, 59, 0.8);
        }
      }
      .banner-icon {
        margin: 20px 20px;
        .icon-size {
          height: 60px;
        }
      }
    }
  }

  .container-middle {
    display: flex;
    justify-content: space-between;
    height: 400px;
    margin-bottom: 10px;
    .middle-left {
      width: 40%;
      background: #ffffff;
      border-radius: 5px;
      .figure-header {
        display: flex;
        align-items: center;
        height: 140px;
        border-bottom: 1px solid #eeeeee;
        .u-circle-avatar {
          height: 100px;
          width: 100px;
          border-radius: 40px;
          margin: 0 30px;
        }
        .info-header,
        .info-middle,
        .info-footer {
          margin-bottom: 10px;
        }
        .info-exclusive {
          display: flex;
          .exclusive-btn {
            width: 60px;
            text-align: center;
            height: 24px;
            line-height: 24px;
            background: rgba(235, 244, 255, 0.9);
            border-radius: 20px;
            cursor: pointer;
          }
        }
      }
      .figure-footer {
        display: flex;
        height: 260px;

        .figure-footer-left {
          height: 100%;
          width: 50%;
          border-right: 1px solid #eeeeee;
          padding: 10px;
          box-sizing: border-box;
          .graph-box {
            height: 100%;
            width: 100%;
          }
        }
        .figure-footer-right {
          height: 100%;
          width: 50%;
          padding: 10px;
          box-sizing: border-box;
          .ratio-box {
            height: 100%;
            width: 100%;
          }
        }
      }
    }
    .middle-right {
      width: 60%;
      border-radius: 5px;
      .notice-box {
        background: #ffffff;
        border-radius: 5px;
        height: 195px;
        margin: 0 0 10px 10px;
        .notice-main {
          height: calc(195px - 60px);
          padding: 10px;
          overflow: auto;

          .notice-item-box {
            display: flex;
            justify-content: space-between;
            height: 28px;
            line-height: 28px;
            border-bottom: 1px solid #eeeeee;
            .notice-item-content {
              flex: 1;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .notice-item-time {
              width: 100px;
              text-align: right;
            }
          }
        }
        .notice-card-header {
          display: flex;
          justify-content: space-between;
          height: 40px;
          line-height: 40px;
          background: rgba(235, 244, 255, 1);
          .u-card-btns {
            display: flex;
            .notice-card-item {
              padding: 0 15px;
              cursor: pointer;
            }
            .notice-card-active {
              background: #ffffff;
            }
          }
        }
      }
      .counsel-box {
        background: #ffffff;
        border-radius: 5px;
        height: 195px;
        padding: 10px;
        margin-left: 10px;
        box-sizing: border-box;
        .counsel-header {
          display: flex;
          justify-content: space-between;
        }
        .counsel-main {
          display: flex;
          flex-wrap: nowrap;
          margin-top: 10px;
          .counsel-card-box {
            display: flex;
            flex-direction: column;
            width: 33%;
            height: 145px;
            border-radius: 4px;
            padding: 10px;
            border: 1px solid #eeeeee;
            box-sizing: border-box;
            &:nth-child(3n-1) {
              margin: 0 5px;
            }
            .counsel-card-title {
              height: 30px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }
            .counsel-card-publish {
              height: 20px;
            }
            .counsel-card-remark {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 4;
              overflow: hidden;
              height: 90px;
              line-height: 20px;
              margin-bottom: 10px;
            }
            .counsel-card-btn {
              .view-btn {
                padding: 3px 10px;
                border-radius: 30px;
                background: #ebf4ff;
                color: rgba(40, 120, 255, 1);
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }

  .container-footer {
    width: 100%;
    min-height: 200px;
    background: #ffffff;
    border-radius: 5px;
    padding: 15px 10px;
    box-sizing: border-box;
    .shelters-header {
      display: flex;
      justify-content: space-between;
      line-height: 30px;
    }
    .expand-box {
      display: flex;
      .expand-first {
        display: flex;
        flex: 1;
        .paper-label {
          width: 65px;
          padding-left: 10px;
        }
        .paper-content {
          flex: 1;
        }
      }
      .expand-end {
        width: 90px;
        text-align: center;
        .claim-btn {
          padding: 3px 15px;
          border-radius: 20px;
          color: #3480ff;
          background: #ebf4ff;
        }
      }
    }
  }
}
</style>
