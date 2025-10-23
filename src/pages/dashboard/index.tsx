import { Row, Col, Card, Progress, Statistic, Timeline, Tag } from 'antd';
import { DollarOutlined, LaptopOutlined, RadarChartOutlined, SnippetsOutlined } from '@ant-design/icons';
import './index.scss';
import ReactEcharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import { getEnergyData } from '../../api/dashboard';



const enterpriseOption = {
  title: {
    text: '企业资质情况(家)'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: [0, 0.01],
    data: ['2014', '2016', '2018', '2020', '2022', "2024"]
  },
  yAxis: {
    type: 'value',

  },
  series: [
    {
      name: '科技企业',
      type: 'bar',
      data: [40, 220, 378, 658, 1122, 1200]
    },
    {
      name: '高新企业',
      type: 'bar',
      data: [20, 39, 443, 490, 559, 762]
    },
    {
      name: '国营企业',
      type: 'bar',
      data: [78, 167, 229, 330, 380, 420]
    }
  ]
};

const leaseOption = {
  legend: {
    top: '10px'
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [30, 100],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: [
        { value: 40, name: '在营' },
        { value: 38, name: '已租' },
        { value: 32, name: '出租' },
        { value: 30, name: '续签' },
        { value: 28, name: '新签' },
        { value: 26, name: '待租' },
        { value: 22, name: '退租' },
      ]
    }
  ]
};

const Dashboard: React.FC = () => {
  const [energyOption, setEnergyOption] = useState({
    title: {
      text: '当日能源消耗'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: []
    },
    grid: {
      left: '%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['0：00', '4：00', '8：00', '12：00', '16：00', '20：00', '24：00']
    },
    yAxis: {
      type: 'value'
    },
    series: []
  });

  useEffect(() => {
    (async () => {
      const res = await getEnergyData();
      if (res.code === 200) {
        const data = res.data;
        // 处理数据，将 name 转换为中文
        const energyData = data.map((item: any) => ({
          name: item.name,
          data: item.data,
          type: 'line',
          stack: 'total',
        }));

        const updateOption = {
          ...energyOption,
          legend: {
            data: energyData.map((item: any) => item.name)
          },
          series: energyData
        };
        setEnergyOption(updateOption);
      }
    })()
  }, [energyOption]);
  return (
    <div className="dashboard">
      <Row gutter={16}>
        <Col span={6}>
          <Card className="dashboard-card clearfix">
            <div className="fl area">
              <h2>13479</h2>
              <p>园区总面积(平方米)</p>
            </div>
            <div className="fr">
              <RadarChartOutlined className="icon" style={{ color: '#7da1f7' }} />
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="dashboard-card clearfix">
            <div className="fl area">
              <h2>8635</h2>
              <p>总租赁面积(平方米)</p>
            </div>
            <div className="fr">
              <SnippetsOutlined className="icon" style={{ color: '#81c452' }} />
            </div>
          </Card>
        </Col><Col span={6}>
          <Card className="dashboard-card clearfix">
            <div className="fl area">
              <h2>38764</h2>
              <p>园区总产值(万元)</p>
            </div>
            <div className="fr">
              <DollarOutlined className="icon" style={{ color: '#62c9cb' }} />
            </div>
          </Card>
        </Col><Col span={6}>
          <Card className="dashboard-card clearfix">
            <div className="fl area">
              <h2>2874</h2>
              <p>入住企业总数(家)</p>
            </div>
            <div className="fr">
              <LaptopOutlined className="icon" style={{ color: '#e49362' }} />
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className="mt">
        <Col span={12}>
          <Card title="能源消耗情况" className="dashboard-cart">
            <ReactEcharts
              option={energyOption}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="企业资质情况" className="dashboard-cart">
            <ReactEcharts
              option={enterpriseOption}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className="mt">
        <Col span={12}>
          <Card title="租赁状态情况" className="dashboard-cart">
            <ReactEcharts
              option={leaseOption}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="充电桩闲置率" className="dashboard-card">
            <div className="wrap">
              <Progress
                type="circle"
                percent={70}
                status="active"
                className="mt"
              />
              <Statistic title="总充电桩数量" value={70} suffix="/100" className="mt" />
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="实时车辆信息" className="dashboard-card">
            <Timeline items={[
              {
                children: <><Tag color="green">进场</Tag>08:24车辆 京A66666</>
              },
              {
                children: <><Tag color="red">出场</Tag>09:15 车辆 京A66666  </>,
                color: 'red',
              },
              {
                children: <><Tag color="green">进场</Tag>09:22 车辆 京A23456  </>,
              },
              {
                children: <><Tag color="red">出场</Tag>10:43 车辆 京A18763  </>,
                color: 'red',
              },
              {
                children: <><Tag color="green">进场</Tag>13:38 车辆 京A88888  </>,
              },
              {
                children: <><Tag color="green">进场</Tag>14:46 车辆 京A23456  </>,

              },
            ]} className="wrap" />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;