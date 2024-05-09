const fs = require('fs');

const dataFilePath = './data.json';

exports.getBillerByIdOrCategory = (req, res) => {
    try {
        const { billerId, billerCategory } = req.query;

        fs.readFile(dataFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return res.status(500).send('Error reading file');
            }

            try {
                const jsonData = JSON.parse(data);
                let filteredBillers = [];

                if (billerId) {
                    const biller = jsonData.find(item => item.billerId === billerId);
                    if (biller) {
                        filteredBillers.push(biller);
                    }
                } else if (billerCategory) {
                    filteredBillers = jsonData.filter(item => item.billerCategory === billerCategory);
                } else {
                    return res.status(400).send('Please provide either billerId or billerCategory');
                }

                if (filteredBillers.length === 0) {
                    return res.status(404).send('No matching billers found');
                }

                const responseData = filteredBillers.map(biller => {
                    const { billerId, billerName, billerCategory, billerInputParams, billerPaymentExactness, billerAdhoc } = biller;
                    const paramName = Array.isArray(billerInputParams.paramInfo) ?
                        billerInputParams.paramInfo.map(param => param.paramName) :
                        [billerInputParams.paramInfo.paramName];

                    const paramInfo = Array.isArray(billerInputParams.paramInfo) ?
                        billerInputParams.paramInfo.map(param => ({
                            paramName: param.paramName,
                            dataType: param.dataType,
                            isOptional: param.isOptional,
                            minLength: param.minLength,
                            maxLength: param.maxLength
                        })) :
                        [{
                            paramName: billerInputParams.paramInfo.paramName,
                            dataType: billerInputParams.paramInfo.dataType,
                            isOptional: billerInputParams.paramInfo.isOptional,
                            minLength: billerInputParams.paramInfo.minLength,
                            maxLength: billerInputParams.paramInfo.maxLength
                        }];

                    return {
                        billerId,
                        billerName,
                        billerCategory,
                        paramName,
                        paramInfo,
                        billerPaymentExactness,
                        billerAdhoc
                    };
                });

                res.json(responseData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).send('Error parsing JSON');
            }
        });
    } catch (error) {
        console.error('Error fetching biller data:', error);
        res.status(500).send('Error fetching biller data');
    }
};
