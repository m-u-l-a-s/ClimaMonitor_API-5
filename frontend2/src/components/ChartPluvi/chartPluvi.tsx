
import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions, View, Text } from 'react-native';
import { themas } from "../../global/themes";
import {chartPluvi} from '../../@types/chartPluv';




interface BarChartPluviometriaProps {
    data: chartPluvi; 
}

const BarChartPluviometria: React.FC<BarChartPluviometriaProps> = ({ data }) => {
    return (
        <View >

            <BarChart
                data={{
                    labels: data.labels,
                    datasets: [{ data: data.values }],
                }}
                yAxisLabel="" 
                yAxisSuffix=""
                width={Dimensions.get('window').width - 30} // Largura do gráfico
                height={220} // Altura do gráfico
                fromZero={true}
                showValuesOnTopOfBars
                chartConfig={{
                   // backgroundColor: '#EAF8E9',
                    backgroundGradientFrom: '#add8e6',
                    //backgroundGradientToOpacity: 3,
                    backgroundGradientTo: '#EAF8E9',
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(1, 33, 105, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(1, 33, 105, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForLabels: {
                        fontSize: 15,
                    },
                    propsForVerticalLabels: {
                        fontSize: 15,
                    },
                    
                    
                }}
                style={{
                    borderWidth: 1,                      
                    borderColor: '#fffff',       
                    borderRadius: 5,          
                }}

            />
        </View>
    );
};

export default BarChartPluviometria;
