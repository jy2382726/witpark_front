import { Row, Col, Card } from 'antd';
import { DollarOutlined, LaptopOutlined, RadarChartOutlined, SnippetsOutlined } from '@ant-design/icons';
import './index.scss';
import ReactEcharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import { getEnergyData } from '../../api/dashboard';

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
  }, []);
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

        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;